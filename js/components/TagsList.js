// import component
import React, { Component } from 'react';
import { View } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
 
export default class  TagsList extends Component {
 
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
            updateArticle: false,
        };
    }


  componentDidUpdate(prevState) {
    if (this.props.selectedItems && !this.state.updateArticle)
    {
      this.setState({ selectedItems: this.props.selectedItems, updateArticle: true });
    }
  }

  onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
    this.props.onSelectedItemsChange(selectedItems);
  };
 
  render() {
    const { selectedItems } = this.state;
    return (
      <View style={{ flex: 1, marginTop: 15 }}>
        <MultiSelect
          hideTags
          items={this.props.items}
          uniqueKey="name"
          ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={this.onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Choose Tags"
          textColor="gray"
          searchInputPlaceholderText="Search Tags..."
          onChangeInput={ (text)=> console.log(text)}
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          searchInputStyle={{ color: '#CCC' }}
          submitButtonColor="#CCC"
          submitButtonText="Add"
          canAddItems={true}
        />
        <View>
          {this.multiSelect && this.multiSelect.getSelectedItemsExt(selectedItems)}
        </View>
      </View>
    );
  }
}