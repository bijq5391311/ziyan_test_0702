 require(['vue','nui','ZeroClipboard'], function (Vue,nui,ZeroClipboard) {
	 window.ZeroClipboard = ZeroClipboard;
	 /*自定义编辑器组件*/
	 Vue.component('bus-ueditor', {
	  props: {
		    ueditorPath: {
		      // UEditor 代码的路径
		      type: String,
		      default: assetsPublicPath+'extensions/UEditor/'
		    },
		    ueditorConfig: {
		      // UEditor 配置项
		      type: Object,
		      default: function () {
		        return {};
		      }
		    }
		  },
		  data () {
		    return {
		      // 为了避免麻烦，每个编辑器实例都用不同的 id
		      randomId: 'editor_' + (Math.random() * 100000000000000000),
		      instance: null,
		      // scriptTagStatus -> 0:代码未加载，1:两个代码依赖加载了一个，2:两个代码依赖都已经加载完成
		      scriptTagStatus: 0
		    };
		  },
		  created () {
			    if (window.UE !== undefined) {
			      // 如果全局对象存在，说明编辑器代码已经初始化完成，直接加载编辑器
			      this.scriptTagStatus = 2;
			      this.initEditor();
			    } else {
			      // 如果全局对象不存在，说明编辑器代码还没有加载完成，需要加载编辑器代码
			      this.insertScriptTag();
			    }
			  },
			  beforeDestroy () {
			    // 组件销毁的时候，要销毁 UEditor 实例
			    if (this.instance !== null && this.instance.destroy) {
			      this.instance.destroy();
			    }
			  },
			  methods: {
			    insertScriptTag () {
			      let editorScriptTag = document.getElementById('editorScriptTag');
			      let configScriptTag = document.getElementById('configScriptTag');

			      // 如果这个tag不存在，则生成相关代码tag以加载代码
			      if (editorScriptTag === null) {
			        configScriptTag = document.createElement('script');
			        configScriptTag.type = 'text/javascript'; configScriptTag.src = this.ueditorPath + 'ueditor.config.js'; configScriptTag.id = 'configScriptTag';

			        editorScriptTag = document.createElement('script');
			        editorScriptTag.type = 'text/javascript'; editorScriptTag.src = this.ueditorPath + 'ueditor.all.min.js'; editorScriptTag.id = 'editorScriptTag';
			        let s = document.getElementsByTagName('head')[0];
			        s.appendChild(configScriptTag);
			        s.appendChild(editorScriptTag);
			      }

			      // 等待代码加载完成后初始化编辑器
			      if (configScriptTag.loaded) {
			        this.scriptTagStatus++;
			      } else {
			        configScriptTag.addEventListener('load', () => {
			          this.scriptTagStatus++;
			          configScriptTag.loaded = true;
			          this.initEditor();
			        });
			      }

			      if (editorScriptTag.loaded) {
			        this.scriptTagStatus++;
			      } else {
			        editorScriptTag.addEventListener('load', () => {
			          this.scriptTagStatus++;
			          editorScriptTag.loaded = true;
			          this.initEditor();
			        });
			      }

			      this.initEditor();
			    },
			    initEditor () {
			      // scriptTagStatus 为 2 的时候，说明两个必需引入的 js 文件都已经被引入，且加载完成
			      if (this.scriptTagStatus === 2 && this.instance === null) {
			        // Vue 异步执行 DOM 更新，这样一来代码执行到这里的时候可能 template 里面的 script 标签还没真正创建
			        // 所以，我们只能在 nextTick 里面初始化 UEditor
			        this.$nextTick(() => {
			          this.instance = window.UE.getEditor(this.randomId, this.ueditorConfig);
			          // 绑定事件，当 UEditor 初始化完成后，将编辑器实例通过自定义的 ready 事件交出去
			          this.instance.addListener('ready', () => {
			            this.$emit('ready', this.instance);
			          });
			        });
			      }
			    }
			  },
	   template: '<script :id="randomId" name="content" type="text/plain"></script>'
	 })
/* /end 自定义编辑器组件*/
	 
/* 自定义编辑器应用：*/
//	 new Vue({
//		  el: '#editor',
//		  data () {
//			    return {
//			      activeName: 'first',
//			      ueditorConfig: {
//			    	  retainOnlyLabelPasted: true
//			      },
//			      editorInstance: {}
//			    }
//			  },
//			  methods: {
//			      editorReady (instance) {
//			    	  instance.setContent('Hello world!<br>你可以在这里初始化编辑器的初始内容。');
//			    	  instance.addListener('contentChange', () => {
//			            console.log('编辑器内容发生了变化：', editorInstance.getContent());
//			          });
//			          // 将实例 instance 存储到 data中
//			    	  this.editorInstance =  instance
//			        },
//			        getAllHtml () {
//			        	alert(this.editorInstance.getAllHtml());		        	
//			        },
//			        getContent () {
//			        	console.log(this.editorInstance.getContent());		        	
//			        },
//			        setContent (isAppendTo) {
//			        	 var arr = [];
//			             arr.push("使用editor.setContent('欢迎使用ueditor')方法可以设置编辑器的内容");
//			             this.editorInstance.setContent('欢迎使用ueditor', isAppendTo);
//			             alert(arr.join("\n"));	        	
//			        },
//			        getText () {
//			        	// 当你点击按钮时编辑区域已经失去了焦点，如果直接用getText将不会得到内容，所以要在选回来，然后取得内容
//			        	 var range = this.editorInstance.selection.getRange();
//			             range.select();
//			             var txt = this.editorInstance.selection.getText();
//			             alert(txt);		        	
//			        }
//			  }
//		})

	 /* /end 自定义编辑器应用：*/
 });
