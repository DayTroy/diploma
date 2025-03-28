import { AuthApiService } from './auth-api.service';
import { AuthFormService } from './auth-forms.service';
import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  TuiAppearance,
  TuiButton,
  TuiError,
  TuiIcon,
  TuiNotification,
  TuiTextfield,
  TuiTitle,
  TuiLink,
  TuiAlertService,
} from '@taiga-ui/core';
import {TuiFieldErrorPipe, TuiSegmented, TuiSwitch, TuiTooltip} from '@taiga-ui/kit';
import {TuiCardLarge, TuiForm, TuiHeader} from '@taiga-ui/layout';
import { map, startWith, Subject, switchMap, timer } from 'rxjs';
import {MaskitoDirective} from '@maskito/angular';
import type {MaskitoOptions} from '@maskito/core';
import {TUI_FALSE_HANDLER} from '@taiga-ui/cdk';
import { TuiButtonLoading } from '@taiga-ui/kit';
import { TUI_ALERT_POSITION } from '@taiga-ui/core';

import mask from './mask';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    ReactiveFormsModule,
    TuiAppearance,
    TuiButton,
    TuiCardLarge,
    TuiError,
    TuiFieldErrorPipe,
    TuiForm,
    TuiHeader,
    TuiIcon,
    TuiNotification,
    TuiSegmented,
    TuiSwitch,
    TuiTextfield,
    TuiTitle,
    TuiTooltip,
    TuiLink,
    MaskitoDirective,
    TuiButtonLoading
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent implements OnInit {

  protected form: FormGroup = new FormGroup({});
  protected readonly trigger$ = new Subject<void>();
  protected readonly loading$ = this.trigger$.pipe(
    switchMap(() => timer(2000).pipe(map(TUI_FALSE_HANDLER), startWith('Loading')))
  );

  authorizationType = 'login';
  readonly options: MaskitoOptions = mask;

  constructor(
    private readonly authForms: AuthFormService,
    private readonly authApi: AuthApiService,
    private readonly alerts: TuiAlertService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.authorizationType === 'login' 
      ? this.authForms.createLoginForm()
      : this.authForms.createRegistrationForm();
  }

  setAuthorizationType(authorizationType: string) {
    this.authorizationType = authorizationType;
    this.initForm();
  }

  initSubscriptions () {
    
  }

  submit(): void {
    if(this.form.invalid) {
      this.alerts
        .open('При загрузке приложения возникли ошибки. Приложение может работать не корректно. Пожалуйста попробуйте снова или перезагрузите страницу', 
          {
            label: 'Ошибка',
            appearance: 'negative',
            autoClose: 0,
          }
        )
        .subscribe();
      return
    } else {
      this.trigger$.next()
      // this.authApi.
    }
  }
}
