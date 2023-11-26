import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableColumn } from '@shared/editable-table/editable-table.component';
import { BehaviorSubject } from 'rxjs';
import { Room } from '@store/app/app.interface';
import { RoomService } from '@core/services/room.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RoomService],
})
export class AdminComponent implements OnInit {
  tableColumns: TableColumn[] = [
    { column: 'ID Отеля', cell: 'hotel_id', type: 'number' },
    { column: 'Номер', cell: 'number', type: 'number' },
    {
      column: 'Тип комнаты',
      cell: 'room_type',
      type: 'select',
      options: ['Люкс', 'Трехместный', 'Двухместный', 'Одноместный'],
    },
    { column: 'Цена за ночь', cell: 'price_per_night', type: 'number' },
    { column: 'Картинка', cell: 'image', type: 'string' },
    { column: 'Количество кроватей', cell: 'bed_count', type: 'number' },
    { column: 'Этаж', cell: 'floor_number', type: 'number' },
    { column: 'Площадь', cell: 'area', type: 'number' },
    { column: 'WiFi', cell: 'has_wifi', type: 'checkbox' },
    { column: 'Телевизор', cell: 'has_tv', type: 'checkbox' },
    { column: 'Кондиционер', cell: 'has_air_conditioning', type: 'checkbox' },
    { column: 'Доступно с', cell: 'available_date', type: 'date' },
  ];

  tableRows$ = new BehaviorSubject<Room[]>([]);

  constructor(private readonly roomsService: RoomService) {}

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomsService.getRooms().subscribe((rooms) => {
      this.tableRows$.next(rooms);
    });
  }

  editRow(data: any): void {
    this.roomsService.upsertRoom(data).subscribe(() => {
      this.getRooms();
    });
  }

  deleteRow(data: any): void {
    this.roomsService.deleteRoom(data.id).subscribe(() => {
      this.getRooms();
    });
  }
}
