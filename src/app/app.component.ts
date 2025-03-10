import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterOutlet } from '@angular/router';
import { delay, Observable, of } from 'rxjs';
import { RestApiEndpoints } from './shared/constants';
import { RestApiService } from './shared/rest-api';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, MatProgressSpinnerModule],
  providers: [RestApiService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'angular-template';

  loadingObservable?: Observable<any>;

  constructor(private restApiService: RestApiService) {
    const url = this.restApiService
      .getApi(RestApiEndpoints.Users)
      .getEndPoint('getUsers')
      .setParams({ id: '1' })
      .execute()
      .subscribe((data) => console.log(data));

    console.log(url);
  }

  onButtonClick() {
    this.loadingObservable = this.fakeApiCall();
  }

  fakeApiCall(): Observable<any> {
    return of(null).pipe(delay(20000));
  }
}
