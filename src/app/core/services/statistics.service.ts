import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupabaseService } from '@core/services/supabase.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  constructor(private supabaseService: SupabaseService) {}

  // CREATE
  // OR REPLACE PROCEDURE get_max_reservation_price () LANGUAGE plpgsql AS $$
  // BEGIN
  // CREATE TEMPORARY TABLE IF NOT EXISTS temp_max_price (max_price NUMERIC);
  // TRUNCATE temp_max_price;
  // INSERT INTO temp_max_price SELECT MAX(reservation.price) AS max_price
  // FROM reservation
  // INNER JOIN room ON room.id = reservation.room_id
  // WHERE room.room_type = 'Люкс';
  // END; $$

  // BEGIN;
  // CALL get_max_reservation_price();
  // SELECT * FROM temp_max_price;
  // COMMIT;

  // CREATE OR REPLACE FUNCTION get_max_reservation_price_fn()
  // RETURNS TABLE(max_price NUMERIC) AS $$
  // BEGIN
  // CALL get_max_reservation_price();
  // RETURN QUERY SELECT * FROM temp_max_price;
  // END; $$ LANGUAGE plpgsql;
  callProcedureMaxReservationPrice(): Observable<any> {
    return this.supabaseService.rpc('get_max_reservation_price_fn');
  }

  // CREATE OR REPLACE PROCEDURE get_min_reservation_price()
  // LANGUAGE plpgsql
  // AS $$
  // BEGIN
  // CREATE TEMPORARY TABLE IF NOT EXISTS temp_min_price (min_price NUMERIC);
  // TRUNCATE temp_min_price;
  // INSERT INTO temp_min_price SELECT MIN(reservation.price) FROM reservation
  // INNER JOIN room ON room.id = reservation.room_id
  // WHERE room.room_type = 'Трехместный';
  // END; $$

  // BEGIN;
  // CALL get_min_reservation_price();
  // SELECT * FROM temp_min_price;
  // COMMIT;

  // CREATE OR REPLACE FUNCTION get_min_reservation_price_fn()
  // RETURNS TABLE(min_price NUMERIC) AS $$
  // BEGIN
  // CALL get_min_reservation_price();
  // RETURN QUERY SELECT * FROM temp_min_price;
  // END; $$ LANGUAGE plpgsql;
  callProcedureMinReservationPrice(): Observable<any> {
    return this.supabaseService.rpc('get_min_reservation_price_fn');
  }

  // CREATE OR REPLACE PROCEDURE get_avg_reservation_price()
  // LANGUAGE plpgsql
  // AS $$
  // BEGIN
  // CREATE TEMPORARY TABLE IF NOT EXISTS temp_avg_price (avg_price NUMERIC);
  // TRUNCATE temp_avg_price;
  // INSERT INTO temp_avg_price SELECT AVG(reservation.price) FROM reservation
  // INNER JOIN menu ON menu.id = reservation.menu_id
  // WHERE menu.name = 'Шведский стол';
  // END; $$

  // BEGIN;
  // CALL get_avg_reservation_price();
  // SELECT * FROM temp_avg_price;
  // COMMIT;

  // CREATE OR REPLACE FUNCTION get_avg_reservation_price_fn()
  // RETURNS TABLE(avg_price NUMERIC) AS $$
  // BEGIN
  // CALL get_avg_reservation_price();
  // RETURN QUERY SELECT * FROM temp_avg_price;
  // END; $$ LANGUAGE plpgsql;
  callProcedureAvgReservationPrice(): Observable<any> {
    return this.supabaseService.rpc('get_avg_reservation_price_fn');
  }

  // CREATE OR REPLACE PROCEDURE get_reservations_count()
  // LANGUAGE plpgsql
  // AS $$
  // BEGIN
  // CREATE TEMPORARY TABLE IF NOT EXISTS temp_reservations_count (reservations_count NUMERIC);
  // TRUNCATE temp_reservations_count;
  // INSERT INTO temp_reservations_count SELECT COUNT(*) FROM reservation
  // INNER JOIN transfer ON transfer.id = reservation.transfer_id
  // WHERE transfer.name = 'Бизнес' OR transfer.name = 'Комфорт';
  // END; $$

  // BEGIN;
  // CALL get_reservations_count();
  // SELECT * FROM temp_reservations_count;
  // COMMIT;

  // CREATE OR REPLACE FUNCTION get_reservations_count_fn()
  // RETURNS TABLE(reservations_count NUMERIC) AS $$
  // BEGIN
  // CALL get_reservations_count();
  // RETURN QUERY SELECT * FROM temp_reservations_count;
  // END; $$ LANGUAGE plpgsql;
  callProcedureReservationsCount(): Observable<any> {
    return this.supabaseService.rpc('get_reservations_count_fn');
  }

  // CREATE OR REPLACE PROCEDURE get_reservations_with_price()
  // LANGUAGE plpgsql
  // AS $$
  // BEGIN
  // CREATE TEMPORARY TABLE IF NOT EXISTS temp_reservations_price (reservations_count NUMERIC);
  // TRUNCATE temp_reservations_price;
  // INSERT INTO temp_reservations_price SELECT COUNT(price) FROM reservation WHERE price > (SELECT AVG(price) FROM reservation);
  // END; $$

  // BEGIN;
  // CALL get_reservations_with_price();
  // SELECT * FROM temp_reservations_price;
  // COMMIT;

  // CREATE OR REPLACE FUNCTION get_reservations_with_price_fn()
  // RETURNS TABLE(reservations_price NUMERIC) AS $$
  // BEGIN
  // CALL get_reservations_with_price();
  // RETURN QUERY SELECT * FROM temp_reservations_price;
  // END; $$ LANGUAGE plpgsql;
  callProcedureReservationsPrice(): Observable<any> {
    return this.supabaseService.rpc('get_reservations_with_price_fn');
  }

//   CREATE
//   OR REPLACE PROCEDURE get_room_reservations_count()
//   LANGUAGE plpgsql AS
//   $$
//   BEGIN
//   CREATE TEMPORARY TABLE IF NOT EXISTS temp_room_reservations
//   (
//     id                 NUMERIC,
//   room_type          TEXT,
//   reservations_count NUMERIC
// );
//   TRUNCATE temp_room_reservations;
//   INSERT INTO temp_room_reservations
//   SELECT room.id,
//   room.room_type,
//   COUNT(reservation.id) AS reservations_count
//   FROM room
//   LEFT JOIN reservation ON room.id = reservation.room_id
//   GROUP BY room.id,
//   room.number;
//   END;
//   $$

  // BEGIN;
  // CALL get_room_reservations_count();
  // SELECT * FROM temp_room_reservations;
  // COMMIT;

  // CREATE OR REPLACE FUNCTION get_room_reservations_count_fn()
  // RETURNS TABLE(id NUMERIC, room_type TEXT, reservations_count NUMERIC) AS $$
  // BEGIN
  // CALL get_room_reservations_count();
  // RETURN QUERY SELECT * FROM temp_room_reservations;
  // END; $$ LANGUAGE plpgsql;
  callProcedureRoomReservationsCount(): Observable<any> {
    return this.supabaseService.rpc('get_room_reservations_count_fn');
  }
}
