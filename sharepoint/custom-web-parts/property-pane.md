# SharePoint FX Property Pane

- [SharePoint FX Property Pane](#sharepoint-fx-property-pane)
  - [Overview](#overview)
    - [Import the Property Type](#import-the-property-type)
    - [Add the Properties to the IPropertyPaneConfiguration Interface](#add-the-properties-to-the-ipropertypaneconfiguration-interface)
    - [Add the Property Type to the Pane Configuration](#add-the-property-type-to-the-pane-configuration)
    - [Add the Property Defaults to the manifest](#add-the-property-defaults-to-the-manifest)
    - [Add the Properties to the DOM, if Needed](#add-the-properties-to-the-dom-if-needed)
  - [Resources](#resources)

## Overview

You can configure the web part property pane using the getPropertyPaneConfiguration property on your web part's main class.

- To add properties to the configuration pane, you need to do several steps.

### Import the Property Type

- The properties are stored in the `@microsoft/sp-webpart-base` library.
- An example import, pulling in text, checkbox, drop-down, and toggle options:

```typescript
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField, // text
  PropertyPaneCheckbox, // checkbox
  PropertyPaneDropdown, // drop-down
  PropertyPaneToggle, // toggle
} from `@microsoft/sp-webpart-base;
```

### Add the Properties to the IPropertyPaneConfiguration Interface

- Declare them and give them types in the IPropertyPaneConfiguration.

```typescript
export interface IHelloWorldWebPartProps {
  description: string;
  test: string;
  test1: boolean;
  test2: string;
  test3: boolean;
}
```

### Add the Property Type to the Pane Configuration

- In the getPropertyPaneConfiguration function, add the desired properties.
- Here's an example using our newly imported options:

```typescript
protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
  return {
    pages: [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
            PropertyPaneTextField('description', {
              label: 'Description'
            }),
            PropertyPaneTextField('test', {
              label: 'Multi-line Text Field',
              multiline: true
            }),
            PropertyPaneCheckbox('test1', {
              text: 'Checkbox'
            }),
            PropertyPaneDropdown('test2', {
              label: 'Dropdown',
              options: [
                { key: '1', text: 'One' },
                { key: '2', text: 'Two' },
                { key: '3', text: 'Three' },
                { key: '4', text: 'Four' }
              ]}),
            PropertyPaneToggle('test3', {
              label: 'Toggle',
              onText: 'On',
              offText: 'Off'
            })
          ]
          }
        ]
      }
    ]
  };
}
```

### Add the Property Defaults to the manifest

- You can configure default values for your declared properties in the <main-class>.manifest.json file.

```typescript
"properties": {
  "description": "HelloWorld",
  "test": "Multi-line text field",
  "test1": true,
  "test2": "2",
  "test3": true
      }
```

### Add the Properties to the DOM, if Needed

- Finally, you can access the newly declared properties in the `render()` method using `this.properties.<property-value>`.

```typescript
<p class="${ styles.description }">${escape(this.properties.test)}</p>
```

## Resources

- [Property Pane Configuration](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/basics/integrate-with-property-pane)
