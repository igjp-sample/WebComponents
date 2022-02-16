import './DockManagerStyles.css'
import { defineCustomElements } from 'igniteui-dockmanager/loader';
import { IgcDockManagerPaneType } from 'igniteui-dockmanager';
import { IgcSplitPaneOrientation } from 'igniteui-dockmanager';
import { IgcDockManagerComponent } from 'igniteui-dockmanager';
import { defineComponents, IgcRadioComponent, IgcRadioGroupComponent, IgcButtonComponent } from 'igniteui-webcomponents';
import 'igniteui-webcomponents/themes/bootstrap.css';

defineCustomElements();
defineComponents(IgcRadioComponent, IgcRadioGroupComponent, IgcButtonComponent);

export class DockManagerOverview {

    private dockManager: IgcDockManagerComponent;
    private radioA: IgcRadioComponent;
    private radioB: IgcRadioComponent;

    constructor() {

        let saveBtn = document.getElementById('saveBtn');
        saveBtn!.addEventListener('click', this.saveLayout);

        let loadBtn = document.getElementById('loadBtn');
        loadBtn!.addEventListener('click', this.loadLayout);

        this.radioA = document.getElementById('radioA') as IgcRadioComponent;
        this.radioB = document.getElementById('radioB') as IgcRadioComponent;

        this.dockManager = document.getElementById('dockManager') as IgcDockManagerComponent;
        this.dockManager.layout = {
            rootPane: {
                type: IgcDockManagerPaneType.splitPane,
                orientation: IgcSplitPaneOrientation.horizontal,
                panes: [
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.vertical,
                        panes: [
                            {
                                type: IgcDockManagerPaneType.contentPane,
                                contentId: 'content1',
                                header: 'Content Pane 1'
                            },
                            {
                                type: IgcDockManagerPaneType.contentPane,
                                contentId: 'content2',
                                header: 'Unpinned Pane 1',
                                isPinned: false
                            }
                        ]
                    },
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.vertical,
                        size: 200,
                        panes: [
                            {
                                type: IgcDockManagerPaneType.documentHost,
                                size: 200,
                                rootPane: {
                                    type: IgcDockManagerPaneType.splitPane,
                                    orientation: IgcSplitPaneOrientation.horizontal,
                                    panes: [
                                        {
                                            type: IgcDockManagerPaneType.tabGroupPane,
                                            panes: [
                                                {
                                                    type: IgcDockManagerPaneType.contentPane,
                                                    header: 'Document 1',
                                                    contentId: 'content3'
                                                },
                                                {
                                                    type: IgcDockManagerPaneType.contentPane,
                                                    header: 'Document 2',
                                                    contentId: 'content4'
                                                }
                                            ]
                                        }
                                    ]
                                }
                            },
                            {
                                type: IgcDockManagerPaneType.contentPane,
                                contentId: 'content5',
                                header: 'Unpinned Pane 2',
                                isPinned: false
                            }
                        ]
                    },
                    {
                        type: IgcDockManagerPaneType.splitPane,
                        orientation: IgcSplitPaneOrientation.vertical,
                        panes: [
                            {
                                type: IgcDockManagerPaneType.tabGroupPane,
                                size: 200,
                                panes: [
                                    {
                                        type: IgcDockManagerPaneType.contentPane,
                                        contentId: 'content6',
                                        header: 'Tab 1'
                                    },
                                    {
                                        type: IgcDockManagerPaneType.contentPane,
                                        contentId: 'content7',
                                        header: 'Tab 2'
                                    },
                                    {
                                        type: IgcDockManagerPaneType.contentPane,
                                        contentId: 'content8',
                                        header: 'Tab 3'
                                    },
                                    {
                                        type: IgcDockManagerPaneType.contentPane,
                                        contentId: 'content9',
                                        header: 'Tab 4'
                                    },
                                    {
                                        type: IgcDockManagerPaneType.contentPane,
                                        contentId: 'content10',
                                        header: 'Tab 5'
                                    }
                                ]
                            },
                            {
                                type: IgcDockManagerPaneType.contentPane,
                                contentId: 'content11',
                                header: 'Content Pane 2'
                            }
                        ]
                    }
                ]
            },
            floatingPanes: [
                {
                    type: IgcDockManagerPaneType.splitPane,
                    orientation: IgcSplitPaneOrientation.horizontal,
                    floatingHeight: 150,
                    floatingWidth: 250,
                    floatingLocation: { x: 300, y: 200 },
                    panes: [
                        {
                            type: IgcDockManagerPaneType.contentPane,
                            contentId: 'content12',
                            header: 'Floating Pane'
                        }
                    ]
                }
            ]
        };
    }

    public saveLayout = (e: any) => {
        if (this.radioA.checked) {
            localStorage.setItem("layoutA", JSON.stringify(this.dockManager.layout));
        } else if (this.radioB.checked) {
            localStorage.setItem("layoutB", JSON.stringify(this.dockManager.layout));
        }
    }
    public loadLayout = (e: any) => {
        if (this.radioA.checked) {
            const storedLayout = JSON.parse(localStorage.getItem("layoutA") as string);
            this.dockManager.layout = storedLayout;
        } else if (this.radioB.checked) {
            const storedLayout = JSON.parse(localStorage.getItem("layoutB") as string);
            this.dockManager.layout = storedLayout;
        }
    }
}

new DockManagerOverview();
