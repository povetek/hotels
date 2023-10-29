import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {
  rooms = [
    {
      image: 'assets/order/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg',
      title: 'Стандартный номер с односпальными кроватями',
      description: 'The rest of the house will still be a mess, but your desk will look great.',
    },
    {
      image: 'assets/order/sasha-kaunas-TAgGZWz6Qg8-unsplash.jpg',
      title: 'Стандартный номер с двуспальной кроватью',
      description: 'Луший отель за 20 рублей',
    },
    {
      image: 'assets/order/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg',
      title: 'Номер Делюкс',
      description: 'Луший отель за 20 рублей',
    },
    {
      image: 'assets/order/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg',
      title: 'Luxor Hotel',
      description: 'Луший отель за 20 рублей',
    },
    {
      image: 'assets/order/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg',
      title: 'Luxor Hotel',
      description: 'Луший отель за 20 рублей',
    },
    {
      image: 'assets/order/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg',
      title: 'Luxor Hotel',
      description: 'Луший отель за 20 рублей',
    },
    {
      image: 'assets/order/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg',
      title: 'Luxor Hotel',
      description: 'Луший отель за 20 рублей',
    },
    {
      image: 'assets/order/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg',
      title: 'Luxor Hotel',
      description: 'Луший отель за 20 рублей',
    },
    {
      image: 'assets/order/valeriia-bugaiova-_pPHgeHz1uk-unsplash.jpg',
      title: 'Luxor Hotel',
      description: 'Луший отель за 20 рублей',
    },
  ];
}
