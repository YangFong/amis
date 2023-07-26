amis.define('docs/zh-CN/components/form/radio.md', function(require, exports, module, define) {

  module.exports = {
    "title": "Radio 单选框",
    "description": null,
    "type": 0,
    "group": null,
    "menuName": "Radio",
    "icon": null,
    "order": 8,
    "html": "<div class=\"markdown-body\"><p>实现组合中的单选功能，此组件只有在 <code>combo</code> 和 <code>input-table</code> 中有意义。</p>\n<h2><a class=\"anchor\" name=\"combo-%E4%B8%AD%E4%BD%BF%E7%94%A8\" href=\"#combo-%E4%B8%AD%E4%BD%BF%E7%94%A8\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>combo 中使用</h2></div><div class=\"amis-preview\" style=\"min-height: undefinedpx\"><script type=\"text/schema\"  scope=\"body\">{\n    \"type\": \"form\",\n    \"debug\": true,\n    data: {\n        answers: [\n          {\n            isAnswer: false,\n            answer: '选项 1'\n          },\n          {\n            isAnswer: false,\n            answer: '选项 2',\n          }\n        ]\n      },\n    \"body\": [\n        {\n          type: 'combo',\n          label: '可选答案',\n          name: 'answers',\n          multiple: true,\n          addable: true,\n          strictMode: false,\n          items: [\n            {\n              type: 'radio',\n              name: 'isAnswer',\n              columnClassName: 'no-grow'\n            },\n            {\n              type: 'input-text',\n              name: 'answer',\n              placeholder: '答案文案'\n            }\n          ]\n        },\n    ]\n}\n</script></div><div class=\"markdown-body\">\n<h2><a class=\"anchor\" name=\"input-table-%E4%B8%AD%E4%BD%BF%E7%94%A8\" href=\"#input-table-%E4%B8%AD%E4%BD%BF%E7%94%A8\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>input-table 中使用</h2></div><div class=\"amis-preview\" style=\"min-height: undefinedpx\"><script type=\"text/schema\"  scope=\"body\">{\n    \"type\": \"form\",\n    \"debug\": true,\n    data: {\n        answers: [\n          {\n            isAnswer: false,\n            answer: '选项 1'\n          },\n          {\n            isAnswer: false,\n            answer: '选项 2',\n            children: [\n              {\n                isAnswer: false,\n                answer: '选项 1'\n              },\n              {\n                isAnswer: false,\n                answer: '选项 2'\n              }\n            ]\n          }\n        ]\n      },\n    \"body\": [\n        {\n          type: 'input-table',\n          label: '可选答案',\n          name: 'answers',\n          multiple: true,\n          addable: true,\n          strictMode: false,\n          columns: [\n            {\n              label: '',\n              type: 'radio',\n              name: 'isAnswer',\n            },\n            {\n              label: '答案文案',\n              type: 'input-text',\n              name: 'answer',\n              placeholder: '答案文案'\n            }\n          ]\n        }\n    ]\n}\n</script></div><div class=\"markdown-body\">\n<h2><a class=\"anchor\" name=\"%E9%85%8D%E7%BD%AE%E7%9C%9F%E5%81%87%E5%80%BC\" href=\"#%E9%85%8D%E7%BD%AE%E7%9C%9F%E5%81%87%E5%80%BC\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>配置真假值</h2><p>默认情况：</p>\n<ul>\n<li>单选框勾选时，表单项值为：true</li>\n<li>单选框取消勾选时，表单项值为：false</li>\n</ul>\n<p>如果你想调整这个值，可以配置<code>trueValue</code>和<code>falseValue</code></p>\n</div><div class=\"amis-preview\" style=\"min-height: undefinedpx\"><script type=\"text/schema\"  scope=\"body\">{\n    \"type\": \"form\",\n    \"debug\": true,\n    data: {\n        answers: [\n          {\n            isAnswer: false,\n            answer: '选项 1'\n          },\n          {\n            isAnswer: false,\n            answer: '选项 2',\n          }\n        ]\n      },\n    \"body\": [\n        {\n          type: 'combo',\n          label: '可选答案',\n          name: 'answers',\n          multiple: true,\n          addable: true,\n          strictMode: false,\n          items: [\n            {\n              type: 'radio',\n              name: 'isAnswer',\n              columnClassName: 'no-grow',\n              trueValue: 1,\n              falseValue: 0\n            },\n            {\n              type: 'input-text',\n              name: 'answer',\n              placeholder: '答案文案'\n            }\n          ]\n        },\n    ]\n}\n</script></div><div class=\"markdown-body\">\n<h2><a class=\"anchor\" name=\"%E5%B1%9E%E6%80%A7%E8%A1%A8\" href=\"#%E5%B1%9E%E6%80%A7%E8%A1%A8\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>属性表</h2><p>除了支持 <a href=\"./formitem#%E5%B1%9E%E6%80%A7%E8%A1%A8\">普通表单项属性表</a> 中的配置以外，还支持下面一些配置</p>\n<table>\n<thead>\n<tr>\n<th>属性名</th>\n<th>类型</th>\n<th>默认值</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>option</td>\n<td><code>string</code></td>\n<td></td>\n<td>选项说明</td>\n</tr>\n<tr>\n<td>trueValue</td>\n<td><code>string｜number｜boolean</code></td>\n<td><code>true</code></td>\n<td>标识真值</td>\n</tr>\n<tr>\n<td>falseValue</td>\n<td><code>string｜number｜boolean</code></td>\n<td><code>false</code></td>\n<td>标识假值</td>\n</tr>\n</tbody></table>\n<h2><a class=\"anchor\" name=\"%E4%BA%8B%E4%BB%B6%E8%A1%A8\" href=\"#%E4%BA%8B%E4%BB%B6%E8%A1%A8\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>事件表</h2><p>当前组件会对外派发以下事件，可以通过<code>onEvent</code>来监听这些事件，并通过<code>actions</code>来配置执行的动作，在<code>actions</code>中可以通过<code>${事件参数名}</code>来获取事件产生的数据（<code>&lt; 2.3.2 及以下版本 为 ${event.data.[事件参数名]}</code>），详细请查看<a href=\"../../docs/concepts/event-action\">事件动作</a>。</p>\n<blockquote>\n<p><code>[name]</code>表示当前组件绑定的名称，即<code>name</code>属性，如果没有配置<code>name</code>属性，则通过<code>value</code>取值。</p>\n</blockquote>\n<table>\n<thead>\n<tr>\n<th>事件名称</th>\n<th>事件参数</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>change</td>\n<td><code>[name]: boolean</code> 组件的值</td>\n<td>选中状态变化时触发</td>\n</tr>\n</tbody></table>\n<h2><a class=\"anchor\" name=\"%E5%8A%A8%E4%BD%9C%E8%A1%A8\" href=\"#%E5%8A%A8%E4%BD%9C%E8%A1%A8\" aria-hidden=\"true\"><svg aria-hidden=\"true\" class=\"octicon octicon-link\" height=\"16\" version=\"1.1\" viewBox=\"0 0 16 16\" width=\"16\"><path d=\"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z\"></path></svg></a>动作表</h2><p>当前组件对外暴露以下特性动作，其他组件可以通过指定<code>actionType: 动作名称</code>、<code>componentId: 该组件id</code>来触发这些动作，动作配置可以通过<code>args: {动作配置项名称: xxx}</code>来配置具体的参数，详细请查看<a href=\"../../docs/concepts/event-action#触发其他组件的动作\">事件动作</a>。</p>\n<table>\n<thead>\n<tr>\n<th>动作名称</th>\n<th>动作配置</th>\n<th>说明</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>clear</td>\n<td>-</td>\n<td>清空</td>\n</tr>\n<tr>\n<td>reset</td>\n<td>-</td>\n<td>将值重置为<code>resetValue</code>，若没有配置<code>resetValue</code>，则清空</td>\n</tr>\n<tr>\n<td>setValue</td>\n<td><code>value: string |number |boolean</code> 更新的值</td>\n<td>更新数据</td>\n</tr>\n</tbody></table>\n</div>",
    "toc": {
      "label": "目录",
      "type": "toc",
      "children": [
        {
          "label": "combo 中使用",
          "fragment": "combo-%E4%B8%AD%E4%BD%BF%E7%94%A8",
          "fullPath": "#combo-%E4%B8%AD%E4%BD%BF%E7%94%A8",
          "level": 2
        },
        {
          "label": "input-table 中使用",
          "fragment": "input-table-%E4%B8%AD%E4%BD%BF%E7%94%A8",
          "fullPath": "#input-table-%E4%B8%AD%E4%BD%BF%E7%94%A8",
          "level": 2
        },
        {
          "label": "配置真假值",
          "fragment": "%E9%85%8D%E7%BD%AE%E7%9C%9F%E5%81%87%E5%80%BC",
          "fullPath": "#%E9%85%8D%E7%BD%AE%E7%9C%9F%E5%81%87%E5%80%BC",
          "level": 2
        },
        {
          "label": "属性表",
          "fragment": "%E5%B1%9E%E6%80%A7%E8%A1%A8",
          "fullPath": "#%E5%B1%9E%E6%80%A7%E8%A1%A8",
          "level": 2
        },
        {
          "label": "事件表",
          "fragment": "%E4%BA%8B%E4%BB%B6%E8%A1%A8",
          "fullPath": "#%E4%BA%8B%E4%BB%B6%E8%A1%A8",
          "level": 2
        },
        {
          "label": "动作表",
          "fragment": "%E5%8A%A8%E4%BD%9C%E8%A1%A8",
          "fullPath": "#%E5%8A%A8%E4%BD%9C%E8%A1%A8",
          "level": 2
        }
      ],
      "level": 0
    }
  };

});
