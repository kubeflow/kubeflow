import { get as getAttributeValue } from 'lodash-es';

export interface MenuConfig {
  field: string;
  menuIcon?: string;
  itemsIcon?: string;
  showTooltip?: boolean;
}

export class MenuValue {
  field: string;
  menuIcon: string;
  itemsIcon: string;
  showTooltip: boolean;

  private defaultValues: MenuConfig = {
    field: '',
    menuIcon: 'more_vert',
    itemsIcon: '',
    showTooltip: true,
  };

  constructor(config: MenuConfig) {
    const { field, menuIcon, itemsIcon, showTooltip } = {
      ...this.defaultValues,
      ...config,
    };

    this.field = field;
    this.menuIcon = menuIcon;
    this.itemsIcon = itemsIcon;
    this.showTooltip = showTooltip;
  }

  getItems(row: any): any[] {
    return getAttributeValue(row, this.field);
  }
}
