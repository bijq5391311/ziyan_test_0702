package org.ecrp.saas.ingest.pipeline;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.JSONPath;

import junit.framework.TestCase;

public class JsonTest  extends TestCase{

	public void testJsonFunc(){
		String json="{\n    \"tag_name\":{\n        required: true,\n        message: \"标签名必填\"\n    },\n    \"order_no\": {\n        required:true,\n        message:\"序号必填\"\n    },\n    \"goods_keywords\":{\n        validator:(rule,value,callback) => {\n            if(/^s*$/.test(value) && /^s*$/.test(this.model.filter_keywords) && /^s*$/.test(this.model.exclude_keywords)){\n                callback(new Error(\"商品关键字、关键词过滤、排除关键词至少填一项\"));\n            }else{\n                callback();\n            }\n        },\n        trigger:\"blur\"\n       \n       \n    },\n    \"filter_keywords\":{\n        validator:(rule,value,callback) => {\n            if(/^s*$/.test(value) && /^s*$/.test(this.model.goods_keywords) && /^s*$/.test(this.model.exclude_keywords)){\n                callback(new Error(\"商品关键字、关键词过滤、排除关键词至少填一项\"));\n            }else{\n                callback();\n            }\n        },\n        trigger:\"blur\"\n    },\n    \"exclude_keywords\":{\n        validator:(rule,value,callback) => {\n            if(/^s*$/.test(value) && /^s*$/.test(this.model.goods_keywords) && /^s*$/.test(this.model.filter_keywords)){\n                callback(new Error(\"商品关键字、关键词过滤、排除关键词至少填一项\"));\n            }else{\n                callback();\n            }\n        },\n        trigger:\"blur\"\n        \n    },\n    \"min_word_count\": {\n        type:\"integer\",\n        message:\"请输入大于0的整数\",\n        min: 0, \n    },\n    \"max_word_count\":{\n         validator:(rule, value, callback) => {\n            if(!Number.isInteger(value)) {\n                callback(new Error('请输入大于0的整数'));\n            }else if(value <= this.model.min_word_count){\n                callback(new Error(\"必须大于最小值\"));\n            }else{\n                callback();\n            }\n        },\n     \n    }\n}";
		JSONObject obj = JSONObject.parseObject(json);
		Object val = JSONPath.eval(obj, "$.goods_keywords.validator");
		assertTrue(val!=null);
	}
}
