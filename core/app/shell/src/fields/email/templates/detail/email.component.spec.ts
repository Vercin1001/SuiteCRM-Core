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
import {EmailDetailFieldsComponent} from './email.component';
import {Component} from '@angular/core';
import {Field} from 'common';
import {UserPreferenceStore} from 'core';
import {userPreferenceStoreMock} from 'core';
import {NumberFormatter} from 'core';
import {numberFormatterMock} from 'core';
import {DatetimeFormatter} from 'core';
import {datetimeFormatterMock} from 'core';
import {DateFormatter} from 'core';
import {dateFormatterMock} from 'core';
import {CurrencyFormatter} from 'core';

@Component({
    selector: 'email-detail-field-test-host-component',
    template: '<scrm-email-detail [field]="field"></scrm-email-detail>'
})
class EmailDetailFieldsTestHostComponent {
    field: Field = {
        type: 'email',
        value: 'the.beans.qa@example.tw'
    };
}

describe('EmailDetailFieldsComponent', () => {
    let testHostComponent: EmailDetailFieldsTestHostComponent;
    let testHostFixture: ComponentFixture<EmailDetailFieldsTestHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [
                EmailDetailFieldsComponent,
                EmailDetailFieldsTestHostComponent
            ],
            providers: [
                {provide: UserPreferenceStore, useValue: userPreferenceStoreMock},
                {provide: NumberFormatter, useValue: numberFormatterMock},
                {provide: DatetimeFormatter, useValue: datetimeFormatterMock},
                {provide: DateFormatter, useValue: dateFormatterMock},
                {
                    provide: CurrencyFormatter,
                    useValue: new CurrencyFormatter(userPreferenceStoreMock, numberFormatterMock, 'en_us')
                },
            ]
        }).compileComponents();

        testHostFixture = TestBed.createComponent(EmailDetailFieldsTestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();
    }));

    it('should create', () => {
        expect(testHostComponent).toBeTruthy();
    });
});
