import { EdgeClipper, ensureBool, ModuleManager } from 'igniteui-webcomponents-core';
import {
    IgcDataGridModule,
    IgcDataGridComponent,
    IgcMultiColumnComboBoxComponent,
    IgcDateTimeColumnComponent,
    IgcGridCellValueChangingEventArgs
} from 'igniteui-webcomponents-grids';

ModuleManager.register(
    IgcDataGridModule
);

export class Sample {
    private grid: IgcDataGridComponent;
    private combo: IgcMultiColumnComboBoxComponent | undefined;
    public dateInput: HTMLInputElement | undefined;

    constructor() {
        this.grid = document.getElementById('grid') as IgcDataGridComponent;
        this.grid.dataSource = [
            { "Country": "United States", "SampleDate": new Date() },
            { "Country": "France", "SampleDate": new Date()  },
            { "Country": "Germany", "SampleDate": new Date()  },
            { "Country": "Japan", "SampleDate": new Date()  },
            { "Country": "United Kingdom", "SampleDate": new Date()  }
        ]
        this.grid.cellEditStarted = this.onCellEditStarted;
        this.grid.cellValueChanging = this.onCellValueChanging;

        let col = document.getElementById("country") as IgcMultiColumnComboBoxComponent;
		col.dataSource = SampleComboData.getPopulation();
        col.fields = [ "Country", "Pop", "Continent" ];
        col.textField = "Country";
    }

    onCellEditStarted = (s: any, a: any) => {
      setTimeout(() => {
        if (!this.combo) {
            let combos = document.getElementsByTagName("igc-multi-column-combo-box");
            if (combos.length > 0)
            {
                this.combo = combos[0] as IgcMultiColumnComboBoxComponent;
                this.combo.textChange = this.onComboTextChange;
            }

        }
        let dateInputs = document.querySelectorAll('[aria-label="Select a date"]');
        if (dateInputs.length > 0)
        {
            this.dateInput = dateInputs[0] as HTMLInputElement;
            this.dateInput.addEventListener('input',this.inputChange);
        }
      })
    }

    onCellValueChanging(s: IgcDataGridComponent, e: IgcGridCellValueChangingEventArgs) {
        //バリデーション処理
        console.log(e)
        if (e.newValue.getTime() == new Date(9999,8,9).getTime()) {
            console.log("error");
            let dateInputs = document.querySelectorAll('[aria-label="Select a date"]');
            if (dateInputs.length > 0)
            {
                this.dateInput = dateInputs[0] as HTMLInputElement;
                const oldDate = e.oldValue as Date;
                this.dateInput.value = oldDate.getFullYear() + "/" + (oldDate.getMonth() + 1) + "/" + oldDate.getDate();
            }
            (document.getElementById("grid") as IgcDataGridComponent).setEditError(e.editID, "エラー!");
        }
    }

    inputChange(e: any){
        let target = e.target as HTMLInputElement;
        if (target.value.length > 12) { // バリデーション条件
            target.setRangeText("9999.9.9",0,-1);
            target.blur();
            // target.setCustomValidity('エラー！'); //https://developer.mozilla.org/ja/docs/Web/API/HTMLInputElement/setCustomValidity
            // target.reportValidity();
        }
    }

    onComboTextChange = (s: any, a: any) => {
        console.log("combo text change");
    }

}

class SampleComboData {
    public static getPopulation(): any[] {
        const data = [
            { Country: "Afghanistan", Pop: 35320445, ID: "Afghanistan", Continent: "Middle East" },
            { Country: "Albania", Pop: 3215988, ID: "Albania", Continent: "Europe" },
            { Country: "Algeria", Pop: 35980193, ID: "Algeria", Continent: "Middle East" },
            { Country: "American Samoa", Pop: 69543, ID: "American Samoa", Continent: "Oceania" },
            { Country: "Andorra", Pop: 86165, ID: "Andorra", Continent: "Europe" },
            { Country: "Angola", Pop: 19618432, ID: "Angola", Continent: "Africa" },
            { Country: "Antigua and Barbuda", Pop: 89612, ID: "Antigua and Barbuda", Continent: "Central America" },
            { Country: "Argentina", Pop: 40764561, ID: "Argentina", Continent: "South America" },
            { Country: "Armenia", Pop: 3100236, ID: "Armenia", Continent: "Europe" },
            { Country: "Aruba", Pop: 108141, ID: "Aruba", Continent: "Central America" },
            { Country: "Australia", Pop: 22323900, ID: "Australia", Continent: "Oceania" },
            { Country: "Austria", Pop: 8423635, ID: "Austria", Continent: "Europe" },
            { Country: "Azerbaijan", Pop: 9173082, ID: "Azerbaijan", Continent: "Middle East" },
            { Country: "Bahamas", Pop: 347176, ID: "Bahamas", Continent: "Central America" },
            { Country: "Bahrain", Pop: 1323535, ID: "Bahrain", Continent: "Middle East" },
            { Country: "Bangladesh", Pop: 150493658, ID: "Bangladesh", Continent: "Asia" },
            { Country: "Barbados", Pop: 273925, ID: "Barbados", Continent: "Central America" },
            { Country: "Belarus", Pop: 9473000, ID: "Belarus", Continent: "Europe" },
            { Country: "Belgium", Pop: 11020952, ID: "Belgium", Continent: "Europe" },
            { Country: "Belize", Pop: 356600, ID: "Belize", Continent: "Central America" },
            { Country: "Benin", Pop: 9099922, ID: "Benin", Continent: "Africa" },
            { Country: "Bermuda", Pop: 64700, ID: "Bermuda", Continent: "Central America" },
            { Country: "Bhutan", Pop: 738267, ID: "Bhutan", Continent: "Asia" },
            { Country: "Bolivia", Pop: 10088108, ID: "Bolivia", Continent: "South America" },
            { Country: "Bosnia and Herzegovina", Pop: 3752228, ID: "Bosnia and Herzegovina", Continent: "Europe" },
            { Country: "Botswana", Pop: 2030738, ID: "Botswana", Continent: "Africa" },
            { Country: "Brazil", Pop: 196655014, ID: "Brazil", Continent: "South America" },
            { Country: "Brunei", Pop: 405938, ID: "Brunei", Continent: "Asia" },
            { Country: "Bulgaria", Pop: 7348328, ID: "Bulgaria", Continent: "Europe" },
            { Country: "Burkina Faso", Pop: 16967845, ID: "Burkina Faso", Continent: "Africa" },
            { Country: "Burundi", Pop: 8575172, ID: "Burundi", Continent: "Africa" },
            { Country: "Cambodia", Pop: 14305183, ID: "Cambodia", Continent: "Asia" },
            { Country: "Cameroon", Pop: 20030362, ID: "Cameroon", Continent: "Africa" },
            { Country: "Canada", Pop: 34483975, ID: "Canada", Continent: "North America" },
            { Country: "Cape Verde", Pop: 500585, ID: "Cape Verde", Continent: "Africa" },
            { Country: "Cayman Islands", Pop: 56729, ID: "Cayman Islands", Continent: "Central America" },
            { Country: "Central African Republic", Pop: 4486837, ID: "Central African Republic", Continent: "Africa" },
            { Country: "Chad", Pop: 11525496, ID: "Chad", Continent: "Africa" },
            { Country: "Channel Islands", Pop: 153876, ID: "Channel Islands", Continent: "Europe" },
            { Country: "Chile", Pop: 17269525, ID: "Chile", Continent: "South America" },
            { Country: "China", Pop: 1344130000, ID: "China", Continent: "Asia" },
            { Country: "Colombia", Pop: 46927125, ID: "Colombia", Continent: "South America" },
            { Country: "Comoros", Pop: 753943, ID: "Comoros", Continent: "Africa" },
            { Country: "Congo, Dem. Rep.", Pop: 67757577, ID: "Congo  Dem  Rep ", Continent: "Africa" },
            { Country: "Congo, Rep.", Pop: 4139748, ID: "Congo  Rep ", Continent: "Africa" },
            { Country: "Costa Rica", Pop: 4726575, ID: "Costa Rica", Continent: "Central America" },
            { Country: "Ivory Coast", Pop: 20152894, ID: "Cote d Ivoire", Continent: "Africa" },
            { Country: "Croatia", Pop: 4403000, ID: "Croatia", Continent: "Europe" },
            { Country: "Cuba", Pop: 11253665, ID: "Cuba", Continent: "Central America" },
            { Country: "Curacao", Pop: 145619, ID: "Curacao", Continent: "Central America" },
            { Country: "Cyprus", Pop: 1116564, ID: "Cyprus", Continent: "Europe" },
            { Country: "Czech Republic", Pop: 10496088, ID: "Czech Republic", Continent: "Europe" },
            { Country: "Denmark", Pop: 5570572, ID: "Denmark", Continent: "Europe" },
            { Country: "Djibouti", Pop: 905564, ID: "Djibouti", Continent: "Africa" },
            { Country: "Dominica", Pop: 67675, ID: "Dominica", Continent: "Central America" },
            { Country: "Dominican Republic", Pop: 10056181, ID: "Dominican Republic", Continent: "Central America" },
            { Country: "Ecuador", Pop: 14666055, ID: "Ecuador", Continent: "South America" },
            { Country: "Egypt, Arab Rep.", Pop: 82536770, ID: "Egypt  Arab Rep ", Continent: "Middle East" },
            { Country: "El Salvador", Pop: 6227491, ID: "El Salvador", Continent: "Central America" },
            { Country: "Equatorial Guinea", Pop: 720213, ID: "Equatorial Guinea", Continent: "Africa" },
            { Country: "Eritrea", Pop: 5415280, ID: "Eritrea", Continent: "Africa" },
            { Country: "Estonia", Pop: 1339928, ID: "Estonia", Continent: "Europe" },
            { Country: "Ethiopia", Pop: 84734262, ID: "Ethiopia", Continent: "Africa" },
            { Country: "Faeroe Islands", Pop: 48863, ID: "Faeroe Islands", Continent: "Central America" },
            { Country: "Fiji", Pop: 868406, ID: "Fiji", Continent: "Oceania" },
            { Country: "Finland", Pop: 5388272, ID: "Finland", Continent: "Europe" },
            { Country: "France", Pop: 65433714, ID: "France", Continent: "Europe" },
            { Country: "French Polynesia", Pop: 273777, ID: "French Polynesia", Continent: "Oceania" },
            { Country: "Gabon", Pop: 1534262, ID: "Gabon", Continent: "Africa" },
            { Country: "Gambia", Pop: 1776103, ID: "Gambia", Continent: "Africa" },
            { Country: "Georgia", Pop: 4486000, ID: "Georgia", Continent: "Europe" },
            { Country: "Germany", Pop: 81797673, ID: "Germany", Continent: "Europe" },
            { Country: "Ghana", Pop: 24965816, ID: "Ghana", Continent: "Africa" },
            { Country: "Greece", Pop: 11300410, ID: "Greece", Continent: "Europe" },
            { Country: "Greenland", Pop: 56840, ID: "Greenland", Continent: "North America" },
            { Country: "Grenada", Pop: 104890, ID: "Grenada", Continent: "Central America" },
            { Country: "Guam", Pop: 182111, ID: "Guam", Continent: "Central America" },
            { Country: "Guatemala", Pop: 14757316, ID: "Guatemala", Continent: "Central America" },
            { Country: "Guinea", Pop: 10221808, ID: "Guinea", Continent: "Africa" },
            { Country: "Guinea-Bissau", Pop: 1547061, ID: "Guinea-Bissau", Continent: "Africa" },
            { Country: "Guyana", Pop: 756040, ID: "Guyana", Continent: "South America" },
            { Country: "Haiti", Pop: 10123787, ID: "Haiti", Continent: "Central America" },
            { Country: "Honduras", Pop: 7754687, ID: "Honduras", Continent: "Central America" },
            { Country: "Hong Kong SAR, China", Pop: 7071600, ID: "Hong Kong SAR  China", Continent: "Asia" },
            { Country: "Hungary", Pop: 9971727, ID: "Hungary", Continent: "Europe" },
            { Country: "Iceland", Pop: 319014, ID: "Iceland", Continent: "Europe" },
            { Country: "India", Pop: 1241491960, ID: "India", Continent: "Asia" },
            { Country: "Indonesia", Pop: 242325638, ID: "Indonesia", Continent: "Asia" },
            { Country: "Iran, Islamic Rep.", Pop: 74798599, ID: "Iran  Islamic Rep ", Continent: "Middle East" },
            { Country: "Iraq", Pop: 32961959, ID: "Iraq", Continent: "Middle East" },
            { Country: "Ireland", Pop: 4576317, ID: "Ireland", Continent: "Europe" },
            { Country: "Isle of Man", Pop: 83327, ID: "Isle of Man", Continent: "Europe" },
            { Country: "Israel", Pop: 7765900, ID: "Israel", Continent: "Middle East" },
            { Country: "Italy", Pop: 60723603, ID: "Italy", Continent: "Europe" },
            { Country: "Jamaica", Pop: 2706500, ID: "Jamaica", Continent: "Central America" },
            { Country: "Japan", Pop: 127817277, ID: "Japan", Continent: "Asia" },
            { Country: "Jordan", Pop: 6181000, ID: "Jordan", Continent: "Middle East" },
            { Country: "Kazakhstan", Pop: 16558676, ID: "Kazakhstan", Continent: "Asia" },
            { Country: "Kenya", Pop: 41609728, ID: "Kenya", Continent: "Africa" },
            { Country: "Kiribati", Pop: 101093, ID: "Kiribati", Continent: "Oceania" },
            { Country: "Korea, Dem. Rep.", Pop: 24451285, ID: "Korea  Dem  Rep ", Continent: "Asia" },
            { Country: "Korea, Rep.", Pop: 49779000, ID: "Korea  Rep ", Continent: "Asia" },
            { Country: "Kosovo", Pop: 1802765, ID: "Kosovo", Continent: "Europe" },
            { Country: "Kuwait", Pop: 2818042, ID: "Kuwait", Continent: "Middle East" },
            { Country: "Kyrgyz Republic", Pop: 5514600, ID: "Kyrgyz Republic", Continent: "Asia" },
            { Country: "Lao PDR", Pop: 6288037, ID: "Lao PDR", Continent: "Asia" },
            { Country: "Latvia", Pop: 2058184, ID: "Latvia", Continent: "Europe" },
            { Country: "Lebanon", Pop: 4259405, ID: "Lebanon", Continent: "Middle East" },
            { Country: "Lesotho", Pop: 2193843, ID: "Lesotho", Continent: "Africa" },
            { Country: "Liberia", Pop: 4128572, ID: "Liberia", Continent: "Africa" },
            { Country: "Libya", Pop: 6422772, ID: "Libya", Continent: "Middle East" },
            { Country: "Liechtenstein", Pop: 36304, ID: "Liechtenstein", Continent: "Europe" },
            { Country: "Lithuania", Pop: 3030173, ID: "Lithuania", Continent: "Europe" },
            { Country: "Luxembourg", Pop: 518252, ID: "Luxembourg", Continent: "Europe" },
            { Country: "Macao SAR, China", Pop: 555731, ID: "Macao SAR  China", Continent: "Asia" },
            { Country: "Macedonia, FYR", Pop: 2063893, ID: "Macedonia  FYR", Continent: "Europe" },
            { Country: "Madagascar", Pop: 21315135, ID: "Madagascar", Continent: "Africa" },
            { Country: "Malawi", Pop: 15380888, ID: "Malawi", Continent: "Africa" },
            { Country: "Malaysia", Pop: 28859154, ID: "Malaysia", Continent: "Asia" },
            { Country: "Maldives", Pop: 320081, ID: "Maldives", Continent: "Asia" },
            { Country: "Mali", Pop: 15839538, ID: "Mali", Continent: "Africa" },
            { Country: "Malta", Pop: 415654, ID: "Malta", Continent: "Europe" },
            { Country: "Marshall Islands", Pop: 54816, ID: "Marshall Islands", Continent: "Oceania" },
            { Country: "Mauritania", Pop: 3541540, ID: "Mauritania", Continent: "Africa" },
            { Country: "Mauritius", Pop: 1286051, ID: "Mauritius", Continent: "Africa" },
            { Country: "Mexico", Pop: 114793341, ID: "Mexico", Continent: "North America" },
            { Country: "Micronesia, Fed. Sts.", Pop: 111542, ID: "Micronesia  Fed  Sts ", Continent: "Oceania" },
            { Country: "Moldova", Pop: 3559000, ID: "Moldova", Continent: "Europe" },
            { Country: "Monaco", Pop: 35427, ID: "Monaco", Continent: "Europe" },
            { Country: "Mongolia", Pop: 2800114, ID: "Mongolia", Continent: "Asia" },
            { Country: "Montenegro", Pop: 632261, ID: "Montenegro", Continent: "Europe" },
            { Country: "Morocco", Pop: 32272974, ID: "Morocco", Continent: "Middle East" },
            { Country: "Mozambique", Pop: 23929708, ID: "Mozambique", Continent: "Africa" },
            { Country: "Myanmar", Pop: 48336763, ID: "Myanmar", Continent: "Asia" },
            { Country: "Namibia", Pop: 2324004, ID: "Namibia", Continent: "Africa" },
            { Country: "Nepal", Pop: 30485798, ID: "Nepal", Continent: "Asia" },
            { Country: "Netherlands", Pop: 16693074, ID: "Netherlands", Continent: "Europe" },
            { Country: "New Caledonia", Pop: 254024, ID: "New Caledonia", Continent: "Oceania" },
            { Country: "New Zealand", Pop: 4405200, ID: "New Zealand", Continent: "Oceania" },
            { Country: "Nicaragua", Pop: 5869859, ID: "Nicaragua", Continent: "Central America" },
            { Country: "Niger", Pop: 16068994, ID: "Niger", Continent: "Africa" },
            { Country: "Nigeria", Pop: 162470737, ID: "Nigeria", Continent: "Africa" },
            { Country: "Northern Mariana Islands", Pop: 61174, ID: "Northern Mariana Islands", Continent: "Central America" },
            { Country: "Norway", Pop: 4953088, ID: "Norway", Continent: "Europe" },
            { Country: "Oman", Pop: 2846145, ID: "Oman", Continent: "Middle East" },
            { Country: "Pakistan", Pop: 176745364, ID: "Pakistan", Continent: "Middle East" },
            { Country: "Palau", Pop: 20609, ID: "Palau", Continent: "Oceania" },
            { Country: "Panama", Pop: 3571185, ID: "Panama", Continent: "Central America" },
            { Country: "Papua New Guinea", Pop: 7013829, ID: "Papua New Guinea", Continent: "Oceania" },
            { Country: "Paraguay", Pop: 6568290, ID: "Paraguay", Continent: "South America" },
            { Country: "Peru", Pop: 29399817, ID: "Peru", Continent: "South America" },
            { Country: "Philippines", Pop: 94852030, ID: "Philippines", Continent: "Asia" },
            { Country: "Poland", Pop: 38534157, ID: "Poland", Continent: "Europe" },
            { Country: "Portugal", Pop: 10556999, ID: "Portugal", Continent: "Europe" },
            { Country: "Puerto Rico", Pop: 3706690, ID: "Puerto Rico", Continent: "Central America" },
            { Country: "Qatar", Pop: 1870041, ID: "Qatar", Continent: "Middle East" },
            { Country: "Romania", Pop: 21384832, ID: "Romania", Continent: "Europe" },
            { Country: "Russian Federation", Pop: 142960000, ID: "Russian Federation", Continent: "Europe" },
            { Country: "Rwanda", Pop: 10942950, ID: "Rwanda", Continent: "Africa" },
            { Country: "Samoa", Pop: 183874, ID: "Samoa", Continent: "Oceania" },
            { Country: "San Marino", Pop: 31735, ID: "San Marino", Continent: "Europe" },
            { Country: "Sao Tome and Principe", Pop: 168526, ID: "Sao Tome and Principe", Continent: "Africa" },
            { Country: "Saudi Arabia", Pop: 28082541, ID: "Saudi Arabia", Continent: "Middle East" },
            { Country: "Senegal", Pop: 12767556, ID: "Senegal", Continent: "Africa" },
            { Country: "Serbia", Pop: 7258745, ID: "Serbia", Continent: "Europe" },
            { Country: "Seychelles", Pop: 86000, ID: "Seychelles", Continent: "Africa" },
            { Country: "Sierra Leone", Pop: 5997486, ID: "Sierra Leone", Continent: "Africa" },
            { Country: "Singapore", Pop: 5183700, ID: "Singapore", Continent: "Asia" },
            { Country: "Sint Maarten", Pop: 36609, ID: "Sint Maarten", Continent: "Europe" },
            { Country: "Slovak Republic", Pop: 5398384, ID: "Slovak Republic", Continent: "Europe" },
            { Country: "Slovenia", Pop: 2052843, ID: "Slovenia", Continent: "Europe" },
            { Country: "Solomon Islands", Pop: 552267, ID: "Solomon Islands", Continent: "Oceania" },
            { Country: "Somalia", Pop: 9556873, ID: "Somalia", Continent: "Middle East" },
            { Country: "South Africa", Pop: 50586757, ID: "South Africa", Continent: "Africa" },
            { Country: "South Sudan", Pop: 10314021, ID: "South Sudan", Continent: "Africa" },
            { Country: "Spain", Pop: 46174601, ID: "Spain", Continent: "Europe" },
            { Country: "Sri Lanka", Pop: 20869000, ID: "Sri Lanka", Continent: "Asia" },
            { Country: "St. Kitts and Nevis", Pop: 53051, ID: "St  Kitts and Nevis", Continent: "Central America" },
            { Country: "St. Lucia", Pop: 176000, ID: "St  Lucia", Continent: "Central America" },
            { Country: "St. Martin (French part)", Pop: 30615, ID: "St  Martin  French part ", Continent: "Europe" },
            { Country: "St. Vincent and the Grenadines", Pop: 109365, ID: "St  Vincent and the Grenadines", Continent: "Central America" },
            { Country: "Sudan", Pop: 34318385, ID: "Sudan", Continent: "Africa" },
            { Country: "SuriCountry", Pop: 529419, ID: "SuriCountry", Continent: "South America" },
            { Country: "Swaziland", Pop: 1067773, ID: "Swaziland", Continent: "Africa" },
            { Country: "Sweden", Pop: 9449213, ID: "Sweden", Continent: "Europe" },
            { Country: "Switzerland", Pop: 7912398, ID: "Switzerland", Continent: "Europe" },
            { Country: "Syrian Arab Republic", Pop: 20820311, ID: "Syrian Arab Republic", Continent: "Middle East" },
            { Country: "Tajikistan", Pop: 6976958, ID: "Tajikistan", Continent: "Asia" },
            { Country: "Tanzania", Pop: 46218486, ID: "Tanzania", Continent: "Africa" },
            { Country: "Thailand", Pop: 69518555, ID: "Thailand", Continent: "Asia" },
            { Country: "Timor-Leste", Pop: 1175880, ID: "Timor-Leste", Continent: "Oceania" },
            { Country: "Togo", Pop: 6154813, ID: "Togo", Continent: "Africa" },
            { Country: "Tonga", Pop: 104509, ID: "Tonga", Continent: "Oceania" },
            { Country: "Trinidad and Tobago", Pop: 1346350, ID: "Trinidad and Tobago", Continent: "Central America" },
            { Country: "Tunisia", Pop: 10673800, ID: "Tunisia", Continent: "Middle East" },
            { Country: "Turkey", Pop: 73639596, ID: "Turkey", Continent: "Middle East" },
            { Country: "Turkmenistan", Pop: 5105301, ID: "Turkmenistan", Continent: "Asia" },
            { Country: "Turks and Caicos Islands", Pop: 39184, ID: "Turks and Caicos Islands", Continent: "Central America" },
            { Country: "Tuvalu", Pop: 9847, ID: "Tuvalu", Continent: "Oceania" },
            { Country: "Uganda", Pop: 34509205, ID: "Uganda", Continent: "Africa" },
            { Country: "Ukraine", Pop: 45706100, ID: "Ukraine", Continent: "Europe" },
            { Country: "United Arab Emirates", Pop: 7890924, ID: "United Arab Emirates", Continent: "Middle East" },
            { Country: "United Kingdom", Pop: 62744081, ID: "United Kingdom", Continent: "Europe" },
            { Country: "United States", Pop: 311591917, ID: "United States", Continent: "North America" },
            { Country: "Uruguay", Pop: 3368595, ID: "Uruguay", Continent: "South America" },
            { Country: "Uzbekistan", Pop: 29341200, ID: "Uzbekistan", Continent: "Asia" },
            { Country: "Vanuatu", Pop: 245619, ID: "Vanuatu", Continent: "Oceania" },
            { Country: "Venezuela, RB", Pop: 29278000, ID: "Venezuela  RB", Continent: "South America" },
            { Country: "Vietnam", Pop: 87840000, ID: "Vietnam", Continent: "Asia" },
            { Country: "Virgin Islands (U.S.)", Pop: 109666, ID: "Virgin Islands US", Continent: "Central America" },
            { Country: "West Bank and Gaza", Pop: 3927051, ID: "West Bank and Gaza", Continent: "Middle East" },
            { Country: "Yemen, Rep.", Pop: 24799880, ID: "Yemen  Rep ", Continent: "Middle East" },
            { Country: "Zambia", Pop: 13474959, ID: "Zambia", Continent: "Africa" },
            { Country: "Zimbabwe", Pop: 12754378, ID: "Zimbabwe", Continent: "Africa" }
        ];
        return data;
    }
}

new Sample();
