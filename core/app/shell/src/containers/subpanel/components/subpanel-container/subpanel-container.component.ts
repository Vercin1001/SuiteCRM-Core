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

import {Component, Input, OnInit} from '@angular/core';
import {map, take} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {LanguageStore, LanguageStringMap, LanguageStrings} from 'core';
import {SubpanelContainerConfig} from '@containers/subpanel/components/subpanel-container/subpanel-container.model';
import {SubpanelStore, SubpanelStoreMap} from '@containers/subpanel/store/subpanel/subpanel.store';
import {MaxColumnsCalculator} from 'core';
import {ViewContext} from 'common';
import {WidgetMetadata} from 'common';
import {GridWidgetConfig, StatisticsQueryArgs} from '@components/grid-widget/grid-widget.component';

interface SubpanelContainerViewModel {
    appStrings: LanguageStringMap;
    subpanels: SubpanelStoreMap;
}

@Component({
    selector: 'scrm-subpanel-container',
    templateUrl: 'subpanel-container.component.html',
    providers: [MaxColumnsCalculator]
})
export class SubpanelContainerComponent implements OnInit {

    @Input() config: SubpanelContainerConfig;

    isCollapsed = false;
    toggleIcon = 'arrow_down_filled';
    maxColumns$: Observable<number>;

    languages$: Observable<LanguageStrings> = this.languageStore.vm$;

    vm$: Observable<SubpanelContainerViewModel>;

    constructor(
        protected languageStore: LanguageStore,
        protected maxColumnCalculator: MaxColumnsCalculator
    ) {
    }

    ngOnInit(): void {
        this.vm$ = combineLatest([this.languages$, this.config.subpanels$]).pipe(
            map(([languages, subpanels]) => ({
                appStrings: languages.appStrings || {},
                subpanels,
            })),
        );

        this.maxColumns$ = this.getMaxColumns();
    }

    getMaxColumns(): Observable<number> {
        return this.maxColumnCalculator.getMaxColumns(this.config.sidebarActive$);
    }

    toggleSubPanels(): void {
        this.isCollapsed = !this.isCollapsed;
        this.toggleIcon = (this.isCollapsed) ? 'arrow_up_filled' : 'arrow_down_filled';
    }

    showSubpanel(item: SubpanelStore): void {
        item.show = !item.show;
        if (item.show) {
            item.load().pipe(take(1)).subscribe();
        }
    }

    getGridConfig(vm: SubpanelStore): GridWidgetConfig {

        if (!vm.metadata || !vm.metadata.insightWidget) {
            return {
                layout: null,
            } as GridWidgetConfig;
        }


        const layout = vm.getWidgetLayout();

        layout.rows.forEach(row => {

            if (!row.cols || !row.cols.length) {
                return;
            }

            row.cols.forEach(col => {

                if (!col.statistic) {
                    return;
                }

                const store = vm.getStatistic(col.statistic);
                if (store) {
                    col.store = store;
                }
            });

        });


        return {
            rowClass: 'statistics-sidebar-widget-row',
            columnClass: 'statistics-sidebar-widget-col',
            layout,
            widgetConfig: {} as WidgetMetadata,
            queryArgs: {
                module: vm.metadata.name,
                context: {module: vm.parentModule, id: vm.parentId} as ViewContext,
                params: {subpanel: vm.metadata.name},
            } as StatisticsQueryArgs,
        } as GridWidgetConfig;
    }
}
