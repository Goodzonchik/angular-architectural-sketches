import { Component } from '@angular/core';

import { RouteService } from '@shared/route/route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-architectural-sketches';

  constructor(public routeService: RouteService) {}
}
