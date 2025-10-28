import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeruMapComponent } from "./components/peru-map/peru-map";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PeruMapComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-peru-map');
}
