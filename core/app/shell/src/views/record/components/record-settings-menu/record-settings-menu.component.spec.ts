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
import {RecordSettingsMenuComponent} from './record-settings-menu.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ApolloTestingModule} from 'apollo-angular/testing';
import {ThemeImagesStore} from 'core';
import {of} from 'rxjs';
import {themeImagesMockData} from 'core';
import {take} from 'rxjs/operators';
import {ImageModule} from '@components/image/image.module';
import {ButtonModule} from '@components/button/button.module';
import {RecordViewStore} from '@views/record/store/record-view/record-view.store';
import {recordviewStoreMock} from '@views/record/store/record-view/record-view.store.spec.mock';
import {ModuleNavigation} from 'core';
import {mockModuleNavigation,} from 'core';
import {SystemConfigStore} from 'core';
import {systemConfigStoreMock} from 'core';
import {UserPreferenceStore} from 'core';
import {userPreferenceStoreMock} from 'core';
import {NavigationStore} from 'core';
import {navigationMock} from 'core';
import {LanguageStore} from 'core';
import {languageStoreMock} from 'core';
import {MetadataStore} from 'core';
import {metadataStoreMock} from 'core';
import {AppStateStore} from 'core';
import {appStateStoreMock} from 'core';
import {Component} from '@angular/core';
import {RecordSettingsMenuModule} from '@views/record/components/record-settings-menu/record-settings-menu.module';
import {RouterTestingModule} from '@angular/router/testing';
import {RecordActionsAdapter} from '@views/record/adapters/actions.adapter';
import {recordActionsMock} from '@views/record/adapters/actions.adapter.spec.mock';

@Component({
    selector: 'record-setting-test-host-component',
    template: '<scrm-record-settings-menu></scrm-record-settings-menu>'
})
class RecordSettingsTestHostComponent {
}

describe('RecordSettingsMenuComponent', () => {

    let testHostComponent: RecordSettingsTestHostComponent;
    let testHostFixture: ComponentFixture<RecordSettingsTestHostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule,
                ApolloTestingModule,
                ImageModule,
                ButtonModule,
                RecordSettingsMenuModule,
                RouterTestingModule
            ],
            declarations: [RecordSettingsMenuComponent, RecordSettingsTestHostComponent],
            providers: [
                {provide: RecordViewStore, useValue: recordviewStoreMock},
                {
                    provide: ThemeImagesStore, useValue: {
                        images$: of(themeImagesMockData).pipe(take(1))
                    }
                },
                {provide: ModuleNavigation, useValue: mockModuleNavigation},
                {provide: SystemConfigStore, useValue: systemConfigStoreMock},
                {provide: UserPreferenceStore, useValue: userPreferenceStoreMock},
                {provide: NavigationStore, useValue: navigationMock},
                {provide: ModuleNavigation, useValue: mockModuleNavigation},
                {provide: LanguageStore, useValue: languageStoreMock},
                {provide: MetadataStore, useValue: metadataStoreMock},
                {provide: AppStateStore, useValue: appStateStoreMock},
                {provide: RecordActionsAdapter, useValue: recordActionsMock},
            ],
        })
            .compileComponents();

        testHostFixture = TestBed.createComponent(RecordSettingsTestHostComponent);
        testHostComponent = testHostFixture.componentInstance;
        testHostFixture.detectChanges();
    }));

    it('should create', () => {
        expect(testHostComponent).toBeTruthy();
    });

    it('should have buttons', () => {
        expect(testHostComponent).toBeTruthy();

        recordviewStoreMock.setMode('detail');

        testHostFixture.detectChanges();
        testHostFixture.whenStable().then(() => {
            const element = testHostFixture.nativeElement;
            const buttons = element.getElementsByClassName('settings-button');


            expect(buttons).toBeTruthy();
            expect(buttons.length).toEqual(2);
            expect(buttons.item(0).textContent).toContain('New');
            expect(buttons.item(1).textContent).toContain('Edit');
        });
    });
});
