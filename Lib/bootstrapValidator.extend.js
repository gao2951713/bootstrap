/***
*	采用闭包方式进行验证
*	包括name="bvTag"验证和控件绑定验证两种模式
*	创建实例
*   var formId ="#addProductFormId";
*	var bvInstance = BpValidatorExtend();
*	//var bvInstance = BpValidatorExtend("#addProductFormId");
*	使用步骤1
*	*bootstrapValidatorBind 绑定控件
*	*bootstrapValidatorManualyOpen 开启验证	-->（前台js调用验证实例）
*	*bootstrapValidatorDestroy 控件销毁
*	
*	使用步骤2
*	*bootstrapValidatorOpen 自动绑定验证到控件通过name属性值；--> 开启验证（前台js调用验证实例）
*	*bootstrapValidatorDestroy 控件销毁
*	
*
*
*
**/

// 	var opts = {
// 	'#addProductFormId':"formAttribute",
// 	'#myfield':"notEmpty"
// 	};
// 	var bvInstance = BpValidatorExtend("#addProductFormId");
// $(document).ready(function() {
// 	
// 	// 验证规则绑定
// 	bvInstance.bootstrapValidatorBind(opts);
// 	// 开启验证
// 	bvInstance.bootstrapValidatorManualyOpen();
// });
// window.onbeforeunload=function checkLeave(e){  
//     //var eevt = e ? e : (window.event ? window.event : null);  //此方法为了在firefox中的兼容  
// 		bvInstance.bootstrapValidatorDestroy();
//         //if(!false)evt.returnValue='离开会使编写的内容丢失。';  
//     }  
// function click () {
// 	//调用验证,返回实例
// 	var bv = bvInstance.bootstrapValidate();
// 	// 执行验证
// 	bv.validate();
// 	if (!bv.isValid()) {
// 		return;
// 	};
// }

/* 	
调用示例
	var bvInstance = BpValidatorExtend("#addProductFormId");

*/
function BpValidatorExtend() {
    var model = {
		/*
			手动绑定页面控件的验证信息
			options 格式为{elTag,bindTag} 
			elTag为控件id, bindTag 为绑定验证规则
		*/
		/*
		调用示例
			var opts = {
			'#addProductFormId':"formAttribute",
			'#myfield':"notEmpty"
			};
			 $(document).ready(function() {
				
				// 验证规则绑定
				bvInstance.bootstrapValidatorBind(opts);
				// 开启验证
				bvInstance.bootstrapValidatorManualyOpen();
			 });
		 */
		bootstrapValidatorBind:function (options) {
			// 排除异常
			if(!options) {
				return;
			}
			// 验证信息提示列表，需要添加时先查找有没有现成的，去重复操作;
			var msglist = {
				'msg01':"This value is not valid",
				'msg02':"The input value is required and cannot be empty",
				'msg03':"The username is not valid",
				'msg04':"The username is required and cannot be empty",
				'msg05':"The input keywords must be less than 30 characters long",
				'msg06':"The username and password cannot be the same as each other",
				'msg07':"The username is not available",
				'msg08':"The input is not a valid email address",
				'msg09':"输入数值不合法，不能输入字母，下划线，首位不能输入0 !",
				'msg10':"输入不合法，只能输入字母，数字，下划线 !",
				'msg11':"输入不合法，只能输入数字!",
				'getMsg' : function (key,val) {
					
				},
			},
			// 验证规则属性列表
			fields = {
				formAttribute:{
					 'data-bv-message':msglist['msg01'],
					 'data-bv-feedbackicons-valid':"glyphicon glyphicon-ok",
					 'data-bv-feedbackicons-invalid':"glyphicon glyphicon-remove",
					 'data-bv-feedbackicons-validating':"glyphicon glyphicon-refresh",
				},
				// Check if the value is empty.
				notEmpty:{
					'required':"required",
					'data-bv-notempty-message':msglist['msg02'],
				},
				username:{
					'required':"required",
					'data-bv-message':msglist['msg03'],
					'data-bv-notempty-message':msglist['msg04'],
					'pattern':"^[a-zA-Z0-9]+$", 
					'data-bv-regexp-message':msglist['msg04'],
					'data-bv-stringlength':"true", 
					'data-bv-stringlength-min':"6", 
					'data-bv-stringlength-max':"30", 
					'data-bv-stringlength-message':msglist['msg05'],
					'data-bv-different':"true", 
					'data-bv-different-field':"password", 
					'data-bv-different-message':msglist['msg06'],
					'data-bv-remote':"true",
					'data-bv-remote-url':"XXX.php" ,
					'data-bv-remote-message':msglist['msg07'],
				},
				length40: {
					'data-bv-stringlength':"true", 
					'data-bv-stringlength-max':"40", 
					'data-bv-stringlength-message':msglist['msg05'],
				},
				email:{
					'data-bv-emailaddress-message':msglist['msg08'],
				},
				
				// 验证尺寸cm，重量g
				number4 : {
					'maxLength':7,
					'pattern' : "^[1-9]{1}[0-9]{3}.[0-9]{2}|[1-9]{1}[0-9]{3}$",
					'data-bv-regexp-message':msglist['msg09'],
				},
				// 字母，数字，下划线
				noChinese : {
					'pattern' : "^[1-9][a-z][A-Z]$",
					'data-bv-regexp-message':msglist['msg10'],
				},
				// 只能输入数字
				numberOnly : {
					'pattern' : "^\\d{0,}$",
					'data-bv-regexp-message':msglist['msg11'],
				},
				// 验证价格
				number5 : {
					'maxLength':8,
					'pattern' : "^[1-9]{1}[0-9]{4}.[0-9]{2}|[1-9]{1}[0-9]{4}$",
					'data-bv-regexp-message':msglist['msg09'],
				},
				Password: {
					
				},
				setLength : function (len) {
					return {"maxLength" : len};
				}
				
			};
			// 批量设置页面验证控件属性绑定操作
			for(var ruleTag in options) {
					var data = options[ruleTag];
				// 判断类型为object还是string
				// 对一组标签绑定一组规则
				if(typeof(data) === 'object') {
					// 遍历该数组对象的索引值，做规则绑定
					for(var idx in data) {
						//this.bind(elTag,ruleTag);
						// 取得控件元素，取得绑定验证规则名称
						var el = $('#'+data[idx])[0],currentBindTag = fields[ruleTag];
						//this.bootstrapValidateAddField("#saveProductFormId",el.name);
							console.log(data[idx]);
						//fields.bind.apply(el.attributes,[el,bindTag]);
						// 将验证规则属性加入到原型链中
						for(obj in currentBindTag) {
							el.setAttribute(obj,currentBindTag[obj]);
						}
					}
				} 
				//对一个标签绑定一组规则
				else if(typeof(data) === 'string') {
					//this.bind(data,ruleTag);
					// 取得控件元素，取得绑定验证规则名称
					var el = $('#'+data)[0],currentBindTag = fields[ruleTag];
					//fields.bind.apply(el.attributes,[el,bindTag]);
					// 将验证规则属性加入到原型链中
					for(obj in currentBindTag) {
						el.setAttribute(obj,currentBindTag[obj]);
					}
				}
			}
			
		},
		/**
		*
		*	elTag 控件id
		*	ruleTag 规则名称
		*	实现对页面控件增加用户自定义属性，将属性加入attributes原型链中,成为原生属性
		*/
		bind : function(elTag,ruleTag) {
			// 取得控件元素，取得绑定验证规则名称
			var el = $('#'+elTag)[0],currentBindTag = fields[ruleTag];
			//fields.bind.apply(el.attributes,[el,bindTag]);
			// 将验证规则属性加入到原型链中
			for(obj in currentBindTag) {
				el.setAttribute(obj,currentBindTag[obj]);
			}
		},
		/*
			手动开启bootstrap验证，
			开启前先执行fn:bootstrapValidatorBind method
		*/
		bootstrapValidatorManualyOpen:function(formId) {
            if (formId) {
                $(formId).bootstrapValidator();
				console.log("bootstrapValidatorManualyOpen if"+formId);
            } else {
                $('.form-horizontal').bootstrapValidator();
				console.log("bootstrapValidatorManualyOpen else"+formId);
            }
		},
        /*bootstrapValidatorOpen();初始化验证模块
		 * <link href="js/bootstrapvalidator/bootstrapValidator.min.css" rel="stylesheet">
		 * <script src="js/bootstrapValidator/bootstrapValidator.min.js" ></script>
		 *验证模块使用规范如下
		 * <div class="form-horizontal">
		 *     <div class="form-group"><!--ms-view:maintain@-->
		 *          <input class="form-control" name="对应的fieldsName,例如processResult"/>
		 *     </div>
		 * </div>
		 */
		 /**	验证模块js端
		 *
		 *			$(document).ready(function(){
		 *					var bvcheck = BpValidatorExtend();
		 *					bvcheck.bootstrapValidatorOpen(".wrapper");
		 *				});
					// 如果是submit类型的控件，就不需要做手动验证，如果验证不通过，submit按钮自动灰掉
		 *			function myclick () {
		 *					//调用验证写法
		 *					//var bv = $('.form-horizontal').data('bootstrapValidator');
		 *					//bv.validate();
		 *					if (!bv.isValid()) {
		 *						return;
		 *					};
		 *					
		 *			}
		 *			function closePage(){
		 *					bvcheck.bootstrapValidatorDestroy(".wrapper");
		 *			}
		 */

        bootstrapValidatorOpen: function (formId) {

                //processResult: {//控件对应名称
                //    validators: {//配置验证项目
                //        notEmpty: {}//不允许为空
                //        regexp: {//验证格式
                //              regexp:/^(^0\d{2}-?\d{8}$)|(^0\d{3}-?\d{7}$)|(^\(0\d{2}\)-?\d{8}$)|(^\(0\d{3}\)-?\d{7}$)$/,
                //              message: '请输入正确的联系方式'
                //        },
                //        stringLength: {//验证长度，注意避免与input自身的maxlength属性冲突
                //              max:10
                //        }
                //    }
                //},
            var fields = {
                //必填内容
                content: {
                    validators: {
                        notEmpty: {}
                    }
                },
                //通用文本验证
                txt: {
                    validators: {
                        notEmpty: {},
                        regexp: {
                            regexp: /^([\u4E00-\u9FFF]|[()（）])+$/,
                            message: '请输入正确格式'
                        }
                    }
                },
                //通用汉字验证
                chinese: {
                    validators: {
                        notEmpty: {},
                        regexp: {
                            regexp: /^([\u4E00-\u9FFF]|[()（）])+$/,
                            message: '请输入汉字'
                        }
                    }
                },
                //通用数字验证
                number: {
                    validators: {
                        notEmpty: {},
                        regexp: {
                            regexp: /^\+?[0-9]*$/,
                            message: '请输入数字'
                        }
                    }
                },
                //通用日期验证
                endDate: {//结束日期
                    validators: {
                        notEmpty: {},
                        date: {
                            format: 'YYYY-MM-DD',
                            min: 'startDate',
                            max: '2055-01-01'
                        }
                    }
                },
                startDate: {//开始日期
                    validators: {
                        notEmpty: {},
                        date: {
                            format: 'YYYY-MM-DD',
                            min: '2000-01-01',
                            max: 'endDate'
                        }
                    }
                },
                withinDate: {//中间日期
                    validators: {
                        notEmpty: {},
                        date: {
                            format: 'YYYY-MM-DD',
                            min: 'startDate',
                            max: 'endDate'
                        }
                    }
                },
                anyDate: {//任意日期
                    validators: {
                        notEmpty: {},
                        date: {
                            format: 'YYYY-MM-DD',
                            min: '2000-01-01',
                            max: '2055-01-01'
                        }
                    }
                },
                //通用网址验证
                website: {//验证www开头
                    validators: {
                        regexp: {
                            //regexp: /^\/\/[wW]{3}\.[\w-]+\.\w{2,4}(\/.*)?$/,
                            regexp: /^[wW]{3}\.[\w-]+\.\w{2,4}(\/.*)?$/,
                            message: '请输入正确的网址'
                        }
                    }
                },
                site: { //验证http://开头的网址
                    validators: {
                        regexp: {
                            regexp: /^(([hH][tT]{2}[pP][sS]?)|([fF][tT][pP]))\:\/\/[wW]{3}\.[\w-]+\.\w{2,4}(\/.*)?$/,
                            message: '请输入正确的网址'
                        }
                    }
                },
                //通用手机验证
                cellphone: {
                    validators: {
                        notEmpty: {},
                        regexp: {
                            regexp: /^1[1-9]\d{9}$/,
                            message: '请输入正确的手机号码'
                        }
                    }
                },
                //通用下拉框验证
                selectValidate: {
                    validators: {
                        notEmpty: {},
                        regexp: {
                            regexp: /[12]/, //只能输入1,2
                            message: '请选择正确项'
                        }
                    }
                },
                //通用验证中文或英文
                chineseOrEnglish: {
                    validators: {
                        notEmpty: {},
                        regexp: {
                            regexp: /^[a-zA-Z\u4e00-\u9fa5]+$/,
                            message: '请输入中文或英文'
                        }
                    }
                },
                //通用验证中文或英文或数字
                chineseOrEnglishorNumber: {
                    validators: {
                        regexp: {
                            //regexp: /^[0-9a-zA-Z\u2E80-\u9FFF]+$/,
                            regexp: /^[0-9a-zA-Z\u4e00-\u9fa5]+$/,
                            message: '请输入中文或英文或数字'
                        }
                    }
                },
                department: {
                    validators: {
                    	 stringLength: {
                            max: 12
                       },
                        regexp: {
                            regexp: /^[0-9a-zA-Z\u4e00-\u9fa5]+$/,
                            message: '请输入中文或英文或数字'
                        }
                    }
                },
                //通用验证邮件
                mail: {
                    validators: {
                        regexp: {
                            regexp: /^([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\-|\.]?)*[a-zA-Z0-9]+(\.[a-zA-Z]{2,3})+$/,
                            message: '请输入正确的邮箱'
                        }
                    }
                },
                //通用qq验证
                qq: { //长度为5到10。
                    validators: {
                        regexp: {
                            regexp: /^\d{5,10}$/,
                            message: '请输入正确的QQ'
                        }
                    }
                },
                //通用skype验证
                skype: { //长度为8。
                    validators: {
                        regexp: {
                            regexp: /^\d{8}$/,
                            message: '请输入正确的Skype'
                        }
                    }
                },

                tel: { //验证手机--[partner-add.js]
                    validators: {
                        regexp: {
                            regexp: /^1[1-9]\d{9}$/,
                            message: '请输入正确的联系方式'
                        }
                    }
                },

                contactBirthdar: {//日历为必填项
                    validators: {
                        notEmpty: {}
                    }
                },
                processResult: { //处理结果
                    validators: {
                        notEmpty: {}
                    }
                },
                description: { //描述
                    validators: {
                        notEmpty: {}
                    }
                },
                officeTel: { //办公电话  加有分机号
                    validators: {
                        regexp: {
                            regexp:/^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
                            message: '格式为：010-00000000-0000'
                        }
                    }
                },
                familyTel:{
                	validators: {
                        regexp: {
                            regexp:/^(^0\d{2}-?\d{8}$)|(^0\d{3}-?\d{7}$)|(^\(0\d{2}\)-?\d{8}$)|(^\(0\d{3}\)-?\d{7}$)$/,
                            message: '格式为：010-11111111'
                        }
                    }
                },
                contractCode: { //合同编号
                    validators: {
                        notEmpty: {}
                    }
                },
                contractTitle: { //合同标题
                    validators: {
                        notEmpty: {}
                    }
                },
                pro: { //所在省份--[partner-add.js]
                    validators: {
                        notEmpty: {},
                    }
                },
                city: { //所在城市--[partner-add.js]
                    validators: {
                        notEmpty: {},
                    }
                },
                account: { //账户--[partner-add.js]
                    validators: {
                        notEmpty: {
                            message: "必选项目"
                        },
                    }
                },
                accountContent: { //账户--[partner-add.js]
                    validators: {
                        notEmpty: {},
                        stringLength: {
                            max: 64
                        }
                    }
                },
                insurance: { //险金--[partner-add.js]
                    validators: {
                        notEmpty: {
                            message: "必选项目"
                        },
                    }
                },
                retroactiveMonths:{
                	validators: {
//                      notEmpty: {
//                          message: "必选项目"
//                      },
 						stringLength: {
                            max: 2
                       	},
						regexp: {
                            regexp: /^\+?[1-99]*$/,
                            message: '请输入[1-99]整数'
                        }
                    }
                },
                supplierName: { //伙伴名称--[partner-add.js]
                    validators: {
                        notEmpty: {},
                        regexp: {
                            regexp: /^([\u4E00-\u9FFF]|[()（）])+$/,
                            message: '请输入中文名称'
                        }
                    }
                },

                pro: { //所在省份--[partner-add.js]
                    validators: {
                        notEmpty: {},
                    }
                },
                legal: { //注册资本--[partner-add.js]
                    validators: {
                        notEmpty: {},
                        stringLength: {
                            max: 10
                        }
                    }
                },
                tax: { //传真号码--[partner-add.js]
                    validators: {
                        digits: {},
                        stringLength: {
                            max: 8
                        }
                    }
                },
                iknowId: { //企业账号--[partner-add.js]
                    validators: {
                        notEmpty: {},
                        stringLength: {
                            max: 9
                        },
                        regexp: {
                            regexp: /^\+?[1-9][0-9]*$/,
                            message: '请输入正确的号码'
                        }
                    }
                },
                regCode: { //执照号码--[partner-add.js]
                    validators: {
                    	stringLength:{
                    		max:20
                    	},
                        regexp: {
                            regexp: /^\+?[1-9][0-9]*$/,
                            message: '请输入正确的号码'
                        }
                    }
                },
                numberCodes: {//正整数验证
                    validators: {
                        digits: {},
                        stringLength: {
                            max: 10
                        }
                    }
                },
                serviceEmCount: {//服务正整数验证
                    validators: {
                        digits: {},
                        stringLength: {
                            max: 5
                        }
                    }
                },
                numberCodeDependency: { //正整数验证(被依赖项)--[partner-add.js]  分数
                    validators: {
                        digits: {}
                    }
                },
                numberCode: { //正整数验证(依赖项)--[partner-add.js]  总数
                    validators: {
                        digits: {
                        },
                        lessThan: {
                            value: "numberCodeDependency"
                        }
                    }
                },
                background: { //公司背景--[partner-add.js]
                    validators: {
                        stringLength: {
                            max: 100
                        }
                    }
                },
                remark: { //备注--[partner-add.js]
                    validators: {
                        stringLength: {
                            max: 200
                        }
                    }
                },
				ownerCompany: {
					validators: {
						notEmpty: {},
						stringLength: {
							min: 0,
							max: 64
						},
						regexp: {
							regexp: /^[a-zA-Z\u4e00-\u9fa5]+[a-zA-Z\u4e00-\u9fa5\u0020]*$/,
							message: '请输入中文或英文'
						}
					}
				},
                companyBaseLowest: { //--[partnerInfo-produce-editInsurance.js]
                    validators: {
                        notEmpty: {},
                        stringLength: {
                            min: 0,
                            max: 18
                        },
                        regexp: {
                            regexp: /^\d+(\.\d{1,4})?$/, //只能输入有1~4位小数的正实数
                            message: '请输入正确的比例或基数'
                        },
                        lessThan: {
                            value: "companyBaseHighest"
                        }
                    }
                },
                companyRate: { //--[partnerInfo-produce-editInsurance.js]
                    validators: {
                        notEmpty: {},
                        stringLength: {
                            min: 0,
                            max: 18
                        },
                        regexp: {
                            regexp: /^\d+(\.\d{1,4})?$/, //只能输入有1~4位小数的正实数
                            message: '请输入正确的比例或基数'
                        }
                    }
                },
                personalBaseLowest: { //--[partnerInfo-produce-editInsurance.js]
                    validators: {
                        notEmpty: {},
                        stringLength: {
                            min: 0,
                            max: 18
                        },
                        regexp: {
                            regexp: /^\d+(\.\d{1,4})?$/, //只能输入有1~4位小数的正实数
                            message: '请输入正确的比例或基数'
                        },
                        lessThan: {
                            value: "personalBaseHighest"
                        }
                    }
                },
                personalRate: { //--[partnerInfo-produce-editInsurance.js]
                    validators: {
                        notEmpty: {},
                        stringLength: {
                            min: 0,
                            max: 18
                        },
                        regexp: {
                            regexp: /^\d+(\.\d{1,4})?$/, //只能输入有1~4位小数的正实数
                            message: '请输入正确的比例或基数'
                        }
                    }
                },
                companyBaseHighest: { //--[partnerInfo-produce-editInsurance.js]
                    validators: { //验证个人基数上限
                        stringLength: {
                            min: 0,
                            max: 18
                        },
                        regexp: {
                            regexp: /^\d+(\.\d{1,4})?$/, //只能输入有1~4位小数的正实数
                            message: '请输入正确的比例或基数'
                        },
                        greaterThan:{
                        	value:"companyBaseLowest"
                        }
                    }
                },
                personalBaseHighest: { //--[partnerInfo-produce-editInsurance.js]
                    validators: { //验证个人基数上限
                        stringLength: {
                            min: 0,
                            max: 18
                        },
                        regexp: {
                            regexp: /^\d+(\.\d{1,4})?$/, //只能输入有1~4位小数的正实数
                            message: '请输入正确的比例或基数'
                        },
                        greaterThan:{
                        	value:"personalBaseLowest"
                        }
                    }
                },
                companyPartBaseHighest: { //--[partnerInfo-produce-editInsurance.js]
                    validators: { //验证个人基数上限
                        stringLength: {
                            min: 0,
                            max: 18
                        },
                        regexp: {
                            regexp: /^\d+(\.\d{1,4})?$/, //只能输入有1~4位小数的正实数
                            message: '请输入正确的比例或基数'
                        },
                        greaterThan:{
                        	value:"companyPartBaseLowest"
                        }
                    }
                },
                personalPartBaseHighest: { //--[partnerInfo-produce-editInsurance.js]
                    validators: { //验证个人基数上限
                        stringLength: {
                            min: 0,
                            max: 18
                        },
                        regexp: {
                            regexp: /^\d+(\.\d{1,4})?$/, //只能输入有1~4位小数的正实数
                            message: '请输入正确的比例或基数'
                        },
                        greaterThan:{
                        	value:"personalPartBaseLowest"
                        }
                    }
                },
                companyPartBaseLowest: { //--[partnerInfo-produce-editInsurance.js]
                    validators: { //验证个人基数上限
                        notEmpty: {},
                        stringLength: {
                            min: 0,
                            max: 18
                        },
                        regexp: {
                            regexp: /^\d+(\.\d{1,4})?$/, //只能输入有1~4位小数的正实数
                            message: '请输入正确的比例或基数'
                        },
                        lessThan: {
                            value: "companyPartBaseHighest"
                        }
                    }
                },
                companyPartRate: { //--[partnerInfo-produce-editInsurance.js]
                    validators: { //验证个人基数上限
                        notEmpty: {},
                        stringLength: {
                            min: 0,
                            max: 18
                        },
                        regexp: {
                            regexp: /^\d+(\.\d{1,4})?$/, //只能输入有1~4位小数的正实数
                            message: '请输入正确的比例或基数'
                        }
                    }
                },
                personalPartBaseLowest: { //--[partnerInfo-produce-editInsurance.js]
                    validators: { //验证个人基数上限
                        notEmpty: {},
                        stringLength: {
                            min: 0,
                            max: 18
                        },
                        regexp: {
                            regexp: /^\d+(\.\d{1,4})?$/, //只能输入有1~4位小数的正实数
                            message: '请输入正确的比例或基数'
                        },
                        lessThan: {
                            value: "personalPartBaseHighest"
                        }
                    }
                },
                personalPartRate: { //--[partnerInfo-produce-editInsurance.js]
                    validators: { //验证个人基数上限
                        notEmpty: {},
                        stringLength: {
                            min: 0,
                            max: 18
                        },
                        regexp: {
                            regexp: /^\d+(\.\d{1,4})?$/, //只能输入有1~4位小数的正实数
                            message: '请输入正确的比例或基数'
                        }
                    }
                },
                //添加记录--功过记录类型
                recordType: {
                    validators: {
                        notEmpty: {},
                        regexp: {
                            regexp: /[^0]/, //不能输入0
                            message: '请选择正确项'
                        }
                    }
                },

                //添加服务[add-service.js]
                serviceContentId: {
                    validators: {
                        notEmpty: {}
                    }
                },
                specificCity: { //--[add-service.js]
                    validators: {
                        notEmpty: {}
                    }
                },
                registeredCapital: { //注册资本
                    validators: {
                        notEmpty: {},
                        stringLength: {
                            max: 8
                        }
                    }
                },
                serviceStartDate: { //--[add-service.js]
                    validators: {
                        notEmpty: {},
                        date: {
                            format: 'YYYY-MM-DD',
                            min: '1900-01-01',
                            max: 'serviceEndDate'
                        }
                    }
                },
                serviceEndDate: { //--[add-service.js]
                    validators: {
                        notEmpty: {},
                        date: {
                            format: 'YYYY-MM-DD',
                            min: 'serviceStartDate',
                            max: '2055-01-01'
                        }
                    }
                },
                serviceFixedPrice: { //固定价格
                    validators: {
                        notEmpty: {},
                        regexp: {
//                          regexp: /^[0-9]+.([0-9]{1,2})?$/, //只能输入有1~2位小数的正实数
							regexp:	/^[0-9]{1,5}(\.\d{1,2})?$/,
                            message: '请输入正确的价格(99999.99)'
                        }
                    }
                },
                servicePersonCount: {
                    validators: {
                        digits: {},
                        regexp: {
                            regexp: /^[1-9]\d{0,8}$/, //第一位不能是0的正整数
                            message: '请输入正确人数'
                        }
                    }
                },
                servicePrice: { //个人价格
                    validators: {
                        regexp: {
                            regexp: /^[0-9]{1,5}(\.\d{1,2})?$/, //只能输入有1~2位小数的正实数
                            message: '请输入正确的价格(99999.99)'
                        }
                    }
                },
                contractEnd: {//合同结束日期
                    validators: {
                        notEmpty: {},
                        date: {
                            format: 'YYYY-MM-DD',
                            min: 'contractStart',
                            max: '2055-01-01'
                        }
                    }
                },
                contractStart: {//合同开始日期
                    validators: {
                        notEmpty: {},
                        date: {
                            format: 'YYYY-MM-DD',
                            min: '1900-01-01',
                            max: 'contractEnd'
                        }
                    }
                },
                contractSign: {//合同签约日期
                    validators: {
                        notEmpty: {},
                        date: {
                            format: 'YYYY-MM-DD',
                            min: 'contractStart',
                            max: 'contractEnd'
                        }
                    }
                },


                //派单规则
                distributionSendPack: { //派单规则发包方
                    validators: {
                        notEmpty: {},
                    }
                },
                distributionCity: { //派单规则城市
                    validators: {
                        notEmpty: {},
                    }
                },
                distributionSupplier: { //派单规则接包方
                    validators: {
                        notEmpty: {},
                    }
                },

                //曾委派机构[partnerInfo-detail-department.js]
                supplierCopartnerName: {
                    validators: {
                        stringLength: {
                            max: 30
                        },
                        regexp: {
                            //regexp: /^[0-9a-zA-Z\u2E80-\u9FFF]+$/,
                            regexp: /^[0-9a-zA-Z\u4e00-\u9fa5]+$/,
                            message: '请输入中文或英文或数字'
                        }
                    }
                },
                supplierCopartnerProvince: {
                    validators: {
                        notEmpty: {}
                    }
                },
                supplierCopartnerCity: {
                    validators: {
                        notEmpty: {}
                    }
                }

            }

            if (formId) {
                $(formId).bootstrapValidator({
                    feedbackIcons: {
                        valid: 'icon icon-check',
                        invalid: 'icon icon-remove',
                        validating: 'icon icon-refresh'
                    },
                    fields: fields
                });
            } else {
                $('.form-horizontal').bootstrapValidator({
                    feedbackIcons: {
                        valid: 'icon icon-check',
                        invalid: 'icon icon-remove',
                        validating: 'icon icon-refresh'
                    },
                    fields: fields
                });
            }
		},

        //通用输入改变日期
        dateFieldChange:function(formId){
			if(formId) {
				$(formId).bootstrapValidator('revalidateField', 'startDate');
				$(formId).bootstrapValidator('revalidateField', 'endDate');
			} else {
				$('.form-horizontal').bootstrapValidator('revalidateField', 'startDate');
				$('.form-horizontal').bootstrapValidator('revalidateField', 'endDate');
			}
        },
        bootstrapValidatorDestroy: function (formId) { //控件销毁

            if (formId) {
				console.log("bootstrapValidatorDestroy if"+formId);
                $(formId).data('bootstrapValidator').destroy()
            } else {
				console.log("bootstrapValidatorDestroy else"+formId);
                $('.form-horizontal').data('bootstrapValidator').destroy()
            }

        },
		
		/*调用验证
		var bv = bvInstance.bootstrapValidate();
		bv.validate();
		if (!bv.isValid()) {
			return;
		};
		*/
		bootstrapValidate: function(formId) {
			var bvobj = $(formId).data('bootstrapValidator');
			return bvobj;
		},
		bootstrapValidateAddField: function(formId,labelName) {
						debugger;
			$(formId).bootstrapValidator('addField',labelName);
		}
    };
    return model;
}

