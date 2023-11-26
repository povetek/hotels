import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDay } from '@taiga-ui/cdk';
import { TuiAlertService, TuiNotificationT } from '@taiga-ui/core';

export function normalizeDate(date: string): TuiDay {
  return date ? TuiDay.normalizeParse(date, 'YMD') : TuiDay.currentLocal();
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
export class EditableTableComponent implements OnChanges, OnInit {
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

  ngOnInit(): void {}

  addTableRow(): void {
    const newRowData = this.createNewRowData(this.columns, {});
    newRowData.actions = new FormControl();
    this.formArray.push(new FormGroup(newRowData));
  }

  editTableRow(formGroup: FormGroup): void {
    const formData = formGroup.getRawValue();
    delete formData.actions;

    if (formGroup.valid) {
      this.editRow.emit(formData);
    } else {
      this.showNotification('Не сохранено', 'Заполните все поля', 'error');
    }
  }

  deleteTableRow(formGroup: FormGroup, index: number): void {
    const formData = formGroup.getRawValue();
    delete formData.actions;

    if (formData.id === null) {
      this.formArray.removeAt(index);
    } else {
      this.deleteRow.emit(formData);
    }
  }

  private updateRows(rows: any[]): void {
    this.formArray.clear();

    rows.forEach((row) => {
      const newRowData = this.createNewRowData(this.columns, row);
      newRowData.actions = new FormControl();
      this.formArray.push(new FormGroup(newRowData));
    });
  }

  private createNewRowData(columns: TableColumn[], row: any): any {
    return columns.reduce((result, column) => {
      let value;

      switch (column.type) {
        case 'checkbox':
          value = !!row[column.cell];
          break;
        case 'date':
          value = normalizeDate(row[column.cell]);
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

  private showNotification(title: string, text: string, status?: TuiNotificationT): void {
    this.alerts.open(text, { label: title, status }).subscribe();
  }
}
