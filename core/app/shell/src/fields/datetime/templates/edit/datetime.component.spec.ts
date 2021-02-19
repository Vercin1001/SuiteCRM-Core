/**
 * SuiteCRM is a customer relationship management program developed by SalesAgility Ltd.
 * Copyright (C) 2021 SalesAgility Ltd.
 *
 * This program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License version 3 as published by the
 * Free Software Foundation with the addition of the following permission added
 * to Section 15 as permitted in Section 7(a): FOR ANY PART OF THE COVERED WORK
 * IN WHICH THE COPYRIGHT IS OWNED BY SALESAGILITY, SALESAGILITY DISCLAIMS THE
 * WARRANTY OF NON INFRINGEMENT OF THIRD PARTY RIGHTS.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * In accordance with Section 7(b) of the GNU Affero General Public License
 * version 3, these Appropriate Legal Notices must retain the display of the
 * "Supercharged by SuiteCRM" logo. If the display of the logos is not reasonably
 * feasible for technical reasons, the Appropriate Legal Notices must display
 * the words "Supercharged by SuiteCRM".
 */

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {Component} from '@angular/core';
import {DateTimeEditFieldComponent} from './datetime.component';
import {Field} from 'common';
import {FormControl, FormsModule} from '@angular/forms';
import {UserPreferenceStore} from 'core';
import {DatetimeFormatter} from 'core';
import {datetimeFormatterMock} from 'core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ButtonModule} from '@components/button/button.module';
import {ThemeImagesStore} from 'core';
import {themeImagesStoreMock} from 'core';
import {distinctUntilChanged} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import {userPreferenceStoreMock} from 'core';
import {NumberFormatter} from 'core';
import {numberFormatterMock} from 'core';
import {DateFormatter} from 'core';
import {dateFormatterMock} from 'core';
import {CurrencyFormatter} from 'core';
import {DateTimeEditFieldModule} from '@fields/datetime/templates/edit/datetime.module';
import {LanguageStore} from 'core';
import {languageStoreMock} from 'core';

@Component({
    selector: 'datetime-edit-field-test-host-component',
    template: '<scrm-datetime-edit [field]="field"></scrm-datetime-edit>'
})
class DatetimeEditFieldTestHostComponent {
    field: Field = {
        type: 'datetime',
        value: '2020-11-09 12:12:12',
        formControl: new FormControl('2020-11-09 12:12:12')
    };
}

describe('DateTimeEditFieldComponent', () => {
    let testHostComponent: DatetimeEditFieldTestHostComponent;
    let testHostFixture: ComponentFixture<DatetimeEditFieldTestHostComponent>;

    /* eslint-disable camelcase, @typescript-eslint/camelcase */
    const preferences = new BehaviorSubject({
        date_format: 'yyyy-MM-dd',
        time_format: 'HH:mm:ss',
    });
    /* eslint-enable camelcase, @typescript-eslint/camelcase */

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                DatetimeEditFieldTestHostComponent,
                DateTimeEditFieldComponent,
            ],
            imports: [
                FormsModule,
                NgbModule,
                ButtonModule,
                DateTimeEditFieldModule
            ],
            providers: [
                {provide: LanguageStore, useValue: languageStoreMock},
                {
                    provide: UserPreferenceStore, useValue: {
                        userPreferences$: preferences.asObservable().pipe(distinctUntilChanged()),
                        getUserPreference: (key: string): any => {

                            if (!preferences.value || !preferences.value[key]) {
                                return null;
                            }

                            return preferences.value[key];
                        }
                    }
                },
                {
                    provide: DatetimeFormatter, useValue: datetimeFormatterMock
                },
                {provide: NumberFormatter, useValue: numberFormatterMock},
                {provide: DatetimeFormatter, useValue: datetimeFormatterMock},
                {provide: DateFormatter, useValue: dateFormatterMock},
                {
                    provide: CurrencyFormatter,
                    useValue: new CurrencyFormatter(userPreferenceStoreMock, numberFormatterMock, 'en_us')
                },
                {
                    provide: ThemeImagesStore, useValue: themeImagesStoreMock
                }
            ],
        }).compileComponents();

        testHostFixture = TestBed.createComponent(DatetimeEditFieldTestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();
    }));

    it('should create', () => {
        expect(testHostComponent).toBeTruthy();
    });
});
