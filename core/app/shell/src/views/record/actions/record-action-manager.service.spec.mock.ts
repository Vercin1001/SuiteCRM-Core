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

import {RecordEditAction} from '@views/record/actions/edit/record-edit.action';
import {RecordCreateAction} from '@views/record/actions/create/record-create.action';
import {RecordToggleWidgetsAction} from '@views/record/actions/toggle-widgets/record-widget-action.service';
import {RecordCancelAction} from '@views/record/actions/cancel/record-cancel.action';
import {NavigationExtras, Router} from '@angular/router';
import {RecordActionManager} from '@views/record/actions/record-action-manager.service';
import {moduleNameMapperMock} from 'core';
import {RecordSaveAction} from '@views/record/actions/save/record-save.action';
import {messageServiceMock} from 'core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NgbModalRef} from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import {CancelCreateAction} from '@views/record/actions/cancel-create/cancel-create.action';
import {actionNameMapperMock} from '@services/navigation/action-name-mapper/action-name-mapper.service.spec.mock';
import {RecordSaveNewAction} from '@views/record/actions/save-new/record-save-new.action';

const mockRouter = {
    navigate: (commands: any[], extras?: NavigationExtras) => {
        if (!extras || !commands) {
            return null;
        }

        return null;
    }
} as Router;

export class MockModal extends NgbModal {

    constructor() {
        super(null, null, null, null);
    }

    open(): NgbModalRef {
        return {
            componentInstance: {
                textKey: '',
                buttons: []
            }
        } as NgbModalRef;
    }
}


export const recordActionsManagerMock = new RecordActionManager(
    new RecordEditAction(),
    new RecordCreateAction(moduleNameMapperMock, mockRouter),
    new RecordToggleWidgetsAction(),
    new RecordCancelAction(new MockModal()),
    new CancelCreateAction(new MockModal(), mockRouter, moduleNameMapperMock, actionNameMapperMock),
    new RecordSaveAction(messageServiceMock),
    new RecordSaveNewAction(messageServiceMock, mockRouter, moduleNameMapperMock, actionNameMapperMock)
);
