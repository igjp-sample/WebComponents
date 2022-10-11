import { IgcSpreadsheetActionExecutedEventArgs, IgcSpreadsheetModule, SpreadsheetAction } from 'igniteui-webcomponents-spreadsheet';
import { IgcSpreadsheetComponent } from 'igniteui-webcomponents-spreadsheet';
import { ModuleManager } from 'igniteui-webcomponents-core';
import { CellReferenceMode, Workbook, WorksheetCell, WorksheetRow } from 'igniteui-webcomponents-excel';
import { WorkbookOptionsBase, WorkbookFormat } from 'igniteui-webcomponents-excel';
import { ExcelUtility } from './ExcelUtility';

ModuleManager.register(IgcSpreadsheetModule);

export class SpreadsheetOverview {

    private spreadsheet: IgcSpreadsheetComponent;

    constructor() {
        this.spreadsheet = document.getElementById('spreadsheet') as IgcSpreadsheetComponent;
        this.spreadsheet.CommandExecuted = this.onCommandExecuted;
        let path = 'https://static.infragistics.com/xplatform/excel/SalesData.xlsx';
        ExcelUtility.loadFromUrl(path).then((w) => {
            this.spreadsheet.workbook = w;
        });
    }

    public onCommandExecuted = async (s: IgcSpreadsheetComponent, e: IgcSpreadsheetActionExecutedEventArgs) => {
        if (e.command == 150) {
            setTimeout(async () => {
                const text = await navigator.clipboard.readText();
                console.log(text);
                const listedPastData = this.processData(text);
                // アクティブセル（貼り付けの起点になるセル）を取得
                const startRowIdx = this.spreadsheet.activeCell.row;
                const startColumnIdx = this.spreadsheet.activeCell.column;
                // 貼り付け対象のカラム数と行数を設定
                let pasteRowCount = listedPastData.length;
                let pasteColumnCount = listedPastData[0].length;
                // 貼り付け対象の行数分ループで処理
                let r = 0;
                for (let rowIdx = 0; rowIdx < pasteRowCount; rowIdx++)
                {
                    let c = 0;
                    // 貼り付け対象の列数分ループで処理
                    for (let colIdx = 0; colIdx < pasteColumnCount; colIdx++)
                    {
                        let pasteValue = listedPastData[rowIdx][colIdx];
                        const workSheetRow:WorksheetRow = new WorksheetRow(this.spreadsheet.workbook.worksheets(0), startRowIdx + r);
                        const address = WorksheetCell.getCellAddressString(
                            workSheetRow,
                            startColumnIdx + c,
                            CellReferenceMode.A1,
                            false
                        );
                        this.spreadsheet.workbook.worksheets(0).getCell(address).value = pasteValue;
                        c++;
                    }
                    r++;
                }
                console.log(this.spreadsheet.activeCell);
            }, 100);
        }
    };

    public processData = (data:string) => {
        const pasteData = data.split("\n");
        let listedPastData = [];
        for (let i = 0; i < pasteData.length; i++)
        {
            if (pasteData[i].length > 0) {
                listedPastData.push(pasteData[i].split("\t"));
            }
        }
        return listedPastData;
    }
}

new SpreadsheetOverview();
