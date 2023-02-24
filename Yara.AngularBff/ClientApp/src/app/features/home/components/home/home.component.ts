import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isLoading = false;

  ngOnInit() {
    this.isLoading = false;
  }

  isIntersecting(status: boolean, index: number) {
    console.log('Element #' + index + ' is intersecting ' + status);
  }
}
