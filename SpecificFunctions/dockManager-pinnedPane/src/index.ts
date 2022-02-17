import './DockManagerStyles.css'
import { defineCustomElements } from 'igniteui-dockmanager/loader';
import { IgcDockManagerLayout, IgcDockManagerPane, IgcDockManagerPaneType } from 'igniteui-dockmanager';
import { IgcSplitPaneOrientation } from 'igniteui-dockmanager';
import { IgcDockManagerComponent } from 'igniteui-dockmanager';

defineCustomElements();

export class DockManagerOverview {

    private dockManager: IgcDockManagerComponent;

    private showPanes: any = [];
    private hidePanes = [1,2,3,4];

    private singleColumnPane: IgcDockManagerLayout = { //一列表示用のレイアウト
        rootPane: {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.vertical,
            panes: []
        }
    }

    private twoColumnPane: IgcDockManagerLayout = { //二’列表示用のレイアウト
        rootPane: {
            type: IgcDockManagerPaneType.splitPane,
            orientation: IgcSplitPaneOrientation.horizontal,
            panes: [
                {
                    type: IgcDockManagerPaneType.splitPane,
                    orientation: IgcSplitPaneOrientation.vertical,
                    panes: []
                },
                {
                    type: IgcDockManagerPaneType.splitPane,
                    orientation: IgcSplitPaneOrientation.vertical,
                    panes: []
                }
            ]
        }
    }

    constructor() {

        let defaltPane: IgcDockManagerLayout = {
            rootPane: {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.horizontal,
                panes: [
                    {
                        type: IgcDockManagerPaneType.contentPane,
                        contentId: '1',
                        header: 'Pane 1',
                        isPinned: false
                    },
                    {
                        type: IgcDockManagerPaneType.contentPane,
                        contentId: '2',
                        header: 'Pane 2',
                        isPinned: false
                    },
                    {
                        type: IgcDockManagerPaneType.contentPane,
                        contentId: '3',
                        header: 'Pane 3',
                        isPinned: false
                    },
                    {
                        type: IgcDockManagerPaneType.contentPane,
                        contentId: '4',
                        header: 'Pane 4',
                        isPinned: false
                    },
                ]
            }
        }

        this.dockManager = document.getElementById('dockManager') as IgcDockManagerComponent;
        this.dockManager.addEventListener('panePinnedToggle', ev => this.onActivePaneChanged(ev)); // ピン/アンピン時のイベント処理
        this.dockManager.layout = defaltPane;
    }

    public onActivePaneChanged = (e: any) => {
        if (e.detail.newValue) { // ピンした場合
            const id = Number(e.detail.sourcePane.contentId);
            this.showPanes.push(id);
            let index = this.hidePanes.indexOf(id);
            this.hidePanes.splice(index, 1);
            this.setLayout();
        } else { // アンピンした場合
            const id = Number(e.detail.sourcePane.contentId);
            this.hidePanes.push(id);
            let index = this.showPanes.indexOf(id);
            this.showPanes.splice(index, 1);
            this.setLayout();
        }
    }

    public setLayout = () => {
        this.hidePanes.sort(function(a, b){return a-b;});
        if (this.showPanes.length > 2) {
            let evenPanes: IgcDockManagerPane[] = []
            let oddPanes: IgcDockManagerPane[] = []
            let j = 0;
            for (let i = 0; i < this.showPanes.length; i++) {
                const contentPane: IgcDockManagerPane = {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: this.showPanes[i].toString(),
                    header: `Pane ${this.showPanes[i]}`,
                    isPinned: true
                };
                if (j % 2 === 0) {
                    evenPanes.push(contentPane);
                } else {
                    oddPanes.push(contentPane);
                }
                j++;
            }
            for (let i = 0; i < this.hidePanes.length; i++) {
                const contentPane: IgcDockManagerPane = {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: this.hidePanes[i].toString(),
                    header: `Pane ${this.hidePanes[i]}`,
                    isPinned: false
                };
                if (j % 2 === 0) {
                    evenPanes.push(contentPane);
                } else {
                    oddPanes.push(contentPane);
                }
                j++;
            }
            this.twoColumnPane.rootPane.panes[0] = {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.vertical,
                panes: evenPanes
            };
            this.twoColumnPane.rootPane.panes[1] = {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.vertical,
                panes: oddPanes
            };
            this.dockManager.layout = this.twoColumnPane;
        } else {
            let newPanes: IgcDockManagerPane[] = []
            for (let i = 0; i < this.showPanes.length; i++) {
                const contentPane: IgcDockManagerPane = {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: this.showPanes[i].toString(),
                    header: `Pane ${this.showPanes[i]}`,
                    isPinned: true
                };
                newPanes.push(contentPane);
            }
            for (let i = 0; i < this.hidePanes.length; i++) {
                const contentPane: IgcDockManagerPane = {
                    type: IgcDockManagerPaneType.contentPane,
                    contentId: this.hidePanes[i].toString(),
                    header: `Pane ${this.hidePanes[i]}`,
                    isPinned: false
                };
                newPanes.push(contentPane);
            }
            this.singleColumnPane.rootPane.panes = newPanes;
            this.dockManager.layout = this.singleColumnPane;
        }
    }
}

new DockManagerOverview();
