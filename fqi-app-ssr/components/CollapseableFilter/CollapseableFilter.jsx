import React from 'react';
import classNames from 'classnames';

import Checkbox from '../Checkbox/Checkbox';
import Icon from '../Icon/Icon';
import s from './CollapseableFilter.module.scss';
import t from '../Icon/Icon.module.scss';

class CollapseableFilter extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: true,
      allSelected: true
    }
    this.togglePanel = this.togglePanel.bind(this);
    this.selectAll = React.createRef();
  }

  togglePanel(e){
    this.setState({open: !this.state.open})
  }

  listItems() {
    const { 
      data, 
      updateItem,
      currentRetailer,
      criteria
    } = this.props;
    const renderedList = Object.keys(data.items).map((item, index) => {
      const element = data.items[item];
      const labelItem = data.itemsLabels[element.id];
      const label = labelItem == null ? element.id : labelItem;
      let type = '';

      if (element.isChild) {
        type = 'child';
      } else if (element.isParent) {
        type = 'parent';
      }

      return (
        <li className={classNames(s.listItem, {[s.listItemMain]: element.isParent} )} key={index}>
          <Checkbox 
            label={label} 
            type={type}
            updateItem={updateItem}
            index={index}
            selected={element.selected}
            parentCode={element.parentCode}
            isParent={element.isParent}
            disabled={currentRetailer && currentRetailer === element.retailerCode}
            currentRetailer={currentRetailer}
            criteria={criteria}
          />
        </li>
      )
    });
    return renderedList;
  }

  render() {
    const { data, selectAllItems, title } = this.props;

    return (
      <fieldset>
        <button onClick={(e)=>this.togglePanel(e)} className={s.header} aria-expanded={this.state.open}>
          <Icon className={classNames(s.titleIcon, t.iconMedium, t.iconTeal)} iconName={data.name} />
          <legend className={s.title}>{title}</legend>
          <Icon className={classNames(s.arrowIcon, t.iconSmall, t.iconOrange, {[s.arrowDown]: this.state.open})} iconName={`chevron`} />
        </button>
        {this.state.open ? (
          <ul className={s.list}>
            <li className={classNames(s.listItem, s.listItemMain)}>
              <Checkbox 
                ref={this.selectAll} 
                label='All' 
                selected={data.allItemsSelected} 
                type='all'
                allNumber = {data.count || Object.keys(data.items).length}
                selectAllItems={selectAllItems}
                name={data.name}
              />
            </li>
            {this.listItems()}
          </ul>
        ) : null}
      </fieldset>
    );
  }
}

export default CollapseableFilter;
  
  