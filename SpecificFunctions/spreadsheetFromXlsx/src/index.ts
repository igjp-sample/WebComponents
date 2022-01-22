import { IgcSpreadsheetModule } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { Workbook } from 'igniteui-webcomponents-excel';
import { WorkbookOptionsBase, WorkbookFormat } from 'igniteui-webcomponents-excel';
import { IgcSpreadsheetChartAdapterModule } from 'igniteui-webcomponents-spreadsheet-chart-adapter';
import { SpreadsheetChartAdapter } from 'igniteui-webcomponents-spreadsheet-chart-adapter';
import { ExcelUtility } from './ExcelUtility';

ModuleManager.register(IgcSpreadsheetModule,IgcSpreadsheetChartAdapterModule);

export class SpreadsheetOverview {

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {

        this.spreadsheet = document.getElementById('spreadsheet') as IgcSpreadsheetComponent;
        this.spreadsheet.chartAdapter = new SpreadsheetChartAdapter();

        let path = 'https://static.infragistics.com/xplatform/excel/SalesData.xlsx';
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });

        let fileInput = document.getElementById('files');
        fileInput!.addEventListener('change', this.onFileRead);
    }

    public onFileRead = (e: any) => {
        let input = e.target;
        if (input.files.length == 0) {
            console.log('No file selected');
            return;
        }
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            ExcelUtility.load(file).then((w) => {
                this.spreadsheet.workbook = w;
            });
        };
        reader.readAsText(file);
    }

}

new SpreadsheetOverview();