import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {
  index = 2;

  readonly items = [
    'John Cleese',
    'Eric Idle',
    'Michael Palin',
    'Graham Chapman',
    'Terry Gilliam',
    'Terry Jones',
  ];
}
