import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotificationT } from '@taiga-ui/core';

export function parseDate(date: string): TuiDay {
  return date ? TuiDay.normalizeParse(date, 'YMD') : TuiDay.currentLocal();
}

export function toStringDate(date: TuiDay): string {
  return date.toString('YMD');
}

export interface TableColumn {
  column: string;
  cell: string;
  type: 'number' | 'string' | 'select' | 'checkbox' | 'date';
  options?: string[];
}

@Component({
  selector: 'app-editable-table',
  templateUrl: './editable-table.component.html',
  styleUrl: './editable-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableTableComponent implements OnChanges {
  @Input() columns: TableColumn[] = [];
  @Input() rows: any[] = [];
  @Output() editRow = new EventEmitter();
  @Output() deleteRow = new EventEmitter();

  formGroup = new FormGroup({
    formArray: new FormArray([]),
  });
  tableColumns: string[] = [];

  get formArray(): FormArray {
    return this.formGroup.get('formArray') as FormArray;
  }

  get formArrayControls(): FormGroup[] {
    return (this.formGroup.get('formArray') as FormArray).controls as FormGroup[];
  }

  constructor(@Inject(TuiAlertService) private readonly alerts: TuiAlertService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']?.currentValue) {
      this.tableColumns = changes['columns'].currentValue.map((column: TableColumn) => column.cell);
      this.tableColumns.push('actions');
    }

    if (changes['rows']?.currentValue) {
      this.updateRows(changes['rows'].currentValue);
    }
  }

  addTableRow(): void {
    const parsedRow = this.parseRow(this.columns, {});
    parsedRow.actions = new FormControl();
    this.formArray.push(new FormGroup(parsedRow));
  }

  editTableRow(formGroup: FormGroup, index: number): void {
    const row = formGroup.getRawValue();
    delete row.actions;

    if (formGroup.valid) {
      const normalizedRow = this.normalizeRow(this.columns, row);
      normalizedRow.id = this.rows[index].id;
      this.editRow.emit(normalizedRow);
    } else {
      this.showNotification('Не сохранено', 'Заполните все поля', 'error');
    }
  }

  deleteTableRow(formGroup: FormGroup, index: number): void {
    const row = formGroup.getRawValue();
    delete row.actions;

    if (row.id === null) {
      this.formArray.removeAt(index);
    } else {
      const normalizedRow = this.normalizeRow(this.columns, row);
      normalizedRow.id = this.rows[index].id;
      this.deleteRow.emit(normalizedRow);
    }
  }

  private updateRows(rows: any[]): void {
    this.formArray.clear();

    rows.forEach((row) => {
      const parsedRow = this.parseRow(this.columns, row);
      parsedRow.actions = new FormControl();
      this.formArray.push(new FormGroup(parsedRow));
    });
  }

  private parseRow(columns: TableColumn[], row: any): any {
    return columns.reduce((result, column) => {
      let value;

      switch (column.type) {
        case 'checkbox':
          value = !!row[column.cell];
          break;
        case 'date':
          value = parseDate(row[column.cell]);
          break;
        default:
          value = row[column.cell];
      }

      return {
        ...result,
        [column.cell]: new FormControl(value, [Validators.required]),
      };
    }, {});
  }

  private normalizeRow(columns: TableColumn[], row: any): any {
    return columns.reduce((result, column) => {
      let value;

      switch (column.type) {
        case 'date':
          value = toStringDate(row[column.cell]);
          break;
        default:
          value = row[column.cell];
      }

      return { ...result, [column.cell]: value };
    }, {});
  }

  private showNotification(title: string, text: string, status?: TuiNotificationT): void {
    this.alerts.open(text, { label: title, status }).subscribe();
  }
}
