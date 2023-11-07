import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Homepage } from '@store/app/app.interface';
import { Store } from '@ngrx/store';
import { AppSelectors } from '@store/app/app.selectors';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit {
  homepage$!: Observable<Homepage | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.homepage$ = this.store.select(AppSelectors.selectHomepage);
  }
}
