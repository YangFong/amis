import React from 'react';
import {Renderer, RendererProps, resolveVariableAndFilter} from 'amis-core';
import {BaseSchema, SchemaCollection, SchemaObject} from '../Schema';
import {CollapseGroup} from 'amis-ui';

/**
 * CollapseGroup 折叠渲染器，格式说明。
 * 文档：https://aisuda.bce.baidu.com/amis/zh-CN/components/collapse
 */
export interface CollapseGroupSchema extends BaseSchema {
  /**
   * 指定为折叠器类型
   */
  type: 'collapse-group';

  /**
   * 激活面板
   */
  activeKey?: Array<string | number | never> | string | number;

  /**
   * 手风琴模式
   */
  accordion?: boolean;

  /**
   * 自定义切换图标
   */
  expandIcon?: SchemaObject;

  /**
   * 设置图标位置
   */
  expandIconPosition?: 'left' | 'right';

  /**
   * 内容区域
   */
  body?: SchemaCollection;
}
export interface CollapseGroupProps
  extends RendererProps,
    Omit<CollapseGroupSchema, 'type' | 'className'> {
  children?: JSX.Element | ((props?: any) => JSX.Element);
}

export class CollapseGroupRender extends React.Component<
  CollapseGroupProps,
  {}
> {
  constructor(props: CollapseGroupProps) {
    super(props);
  }
  render() {
    const {
      defaultActiveKey,
      accordion,
      expandIcon,
      expandIconPosition,
      body,
      className,
      style,
      render
    } = this.props;
    let activeKey = defaultActiveKey;
    if (
      typeof defaultActiveKey === 'string' &&
      defaultActiveKey.indexOf('${') > -1
    ) {
      activeKey = resolveVariableAndFilter(
        this.props.defaultActiveKey,
        this.props.data
      );
    }
    return (
      <CollapseGroup
        defaultActiveKey={activeKey}
        accordion={accordion}
        expandIcon={expandIcon}
        expandIconPosition={expandIconPosition}
        className={className}
        style={style}
      >
        {render('body', body || '')}
      </CollapseGroup>
    );
  }
}

@Renderer({
  type: 'collapse-group'
})
export class CollapseGroupRenderer extends CollapseGroupRender {}
