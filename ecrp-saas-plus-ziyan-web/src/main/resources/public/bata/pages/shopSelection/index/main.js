import Vue from 'vue'
import NuiJs from 'nui-js'
import busDraggable from 'vuedraggable'

Vue.use(NuiJs)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#example',
  data () {
    return {
      activeName2: 'first',
      // 多层级店铺选择配置项
      multiNames: 'brand1',
      dataOnline: [
        {
          'label': '天猫',
          'id': 1,
          'children': [
            {
              'label': '晨光官方旗舰店晨光官',
              'id': 2,
              'children': []
            },
            {
              'label': 'mg晨光上海专卖店',
              'id': 5
            },
            {
              'label': 'mg晨专卖店',
              'id': 15
            },
            {
              'label': 'mg专卖店',
              'id': 16
            },
            {
              'label': 'mg晨专卖店',
              'id': 18
            },
            {
              'label': 'mg专卖店',
              'id': 16
            }
          ]
        },
        {
          'label': '京东',
          'id': 6,
          'children': [
            {
              'label': 'MG晨光文具旗舰店',
              'id': 7
            }
          ]
        },
        {
          'label': '有赞',
          'id': 8,
          'children': [
            {
              'label': '晨光文具',
              'id': 9
            }
          ]
        }
      ],
      onlineProps: {
        children: 'children',
        label: 'label'
      },
      dataLine: [
        {
          'label': '华东',
          'id': 101,
          'pid': '601',
          'children': [
            {
              'label': '上海',
              'id': 101001,
              'pid': '603',
              'children': [
                {
                  'label': '上海市',
                  'id': 1011,
                  'pid': '603',
                  'children': [
                    {
                      'label': '黄浦区',
                      'id': 10111,
                      'pid': '603',
                      'children': [
                        {
                          'label': '晨光官方旗舰店',
                          'id': 101111,
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '101112',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '101113',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '1013233',
                          'pid': '603'
                        }
                      ]
                    },
                    {
                      'label': '黄浦区',
                      'id': '10111',
                      'pid': '603',
                      'children': [
                        {
                          'label': '晨光官方旗舰店',
                          'id': '101111',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '101112',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '101113',
                          'pid': '603'
                        }]
                    },
                    {
                      'label': '徐汇区',
                      'id': '10112',
                      'pid': '603',
                      'children': [
                        {
                          'label': '晨光徐汇区官方旗舰店',
                          'id': '101121',
                          'pid': '603'
                        },
                        {
                          'label': 'mg徐汇区专卖店',
                          'id': '101122',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光徐汇区专卖店',
                          'id': '101123',
                          'pid': '603'
                        }]
                    }]
                }]
            },
            {
              'label': '江苏',
              'id': '101002',
              'pid': '603',
              'children': [
                {
                  'label': '南京市',
                  'id': '1012',
                  'pid': '603',
                  'children': [
                    {
                      'label': '江宁区',
                      'id': '10121',
                      'pid': '603',
                      'children': [
                        {
                          'label': '晨光官方旗舰店',
                          'id': '101211',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '101212',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '101213',
                          'pid': '603'
                        }]
                    },
                    {
                      'label': '黄浦区',
                      'id': '10131',
                      'pid': '603',
                      'children': [
                        {
                          'label': '晨光官方旗舰店',
                          'id': '101311',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '101312',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '101313',
                          'pid': '603'
                        }]
                    },
                    {
                      'label': '徐汇区',
                      'id': '10142',
                      'pid': '603',
                      'children': [
                        {
                          'label': '晨光徐汇区官方旗舰店',
                          'id': '101421',
                          'pid': '603'
                        },
                        {
                          'label': 'mg徐汇区专卖店',
                          'id': '101422',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光徐汇区专卖店',
                          'id': '101423',
                          'pid': '603'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              'label': '浙江',
              'id': '101003',
              'pid': '603',
              'children': [
                {
                  'label': '杭州市',
                  'id': '1015',
                  'pid': '603',
                  'children': [
                    {
                      'label': '上城区',
                      'id': '10151',
                      'pid': '603',
                      'children': [
                        {
                          'label': '晨光官方旗舰店',
                          'id': '101511',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '101512',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '101513',
                          'pid': '603'
                        }
                      ]
                    },
                    {
                      'label': '下城区',
                      'id': '10161',
                      'pid': '603',
                      'children': [
                        {
                          'label': '晨光官方旗舰店',
                          'id': '101611',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '101612',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '101613',
                          'pid': '603'
                        }
                      ]
                    },
                    {
                      'label': '江干区',
                      'id': '10172',
                      'pid': '603',
                      'children': [
                        {
                          'label': '晨光江干区官方旗舰店',
                          'id': '101721',
                          'pid': '603'
                        },
                        {
                          'label': 'mg江干区专卖店',
                          'id': '101722',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光江干区专卖店',
                          'id': '101723',
                          'pid': '603'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          'label': '华北',
          'id': '102',
          'pid': '601',
          'children': [
            {
              'label': '北京',
              'id': '10006',
              'pid': '604',
              'children': [
                {
                  'label': '北京市',
                  'id': '1019',
                  'pid': '603',
                  'children': [
                    {
                      'label': '朝阳区',
                      'id': '10191',
                      'pid': '603',
                      'children': [
                        {
                          'label': '晨光官方旗舰店',
                          'id': '101911',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光朝阳区专卖店',
                          'id': '101912',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光朝阳区专卖店',
                          'id': '101913',
                          'pid': '603'
                        }
                      ]
                    },
                    {
                      'label': '东城区',
                      'id': '10211',
                      'pid': '603',
                      'children': [
                        {
                          'label': '晨光官方旗舰店',
                          'id': '102111',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '102112',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光上海专卖店',
                          'id': '102113',
                          'pid': '603'
                        }
                      ]
                    },
                    {
                      'label': '西城区',
                      'id': '10312',
                      'pid': '603',
                      'children': [
                        {
                          'label': '晨光徐汇区官方旗舰店',
                          'id': '103121',
                          'pid': '603'
                        },
                        {
                          'label': 'mg徐汇区专卖店',
                          'id': '103122',
                          'pid': '603'
                        },
                        {
                          'label': 'mg晨光徐汇区专卖店',
                          'id': '103123',
                          'pid': '603'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              'label': '天津',
              'id': '10007',
              'pid': '604'
            },
            {
              'label': '山西',
              'id': '10008',
              'pid': '604'
            }
          ]
        },
        {
          'label': '华中',
          'id': '103',
          'pid': '601',
          'children': [
            {
              'label': '湖南',
              'id': '10009',
              'pid': '604'
            },
            {
              'label': '湖北省',
              'id': '10018',
              'pid': '604'
            },
            {
              'label': '河南省',
              'id': '10019',
              'pid': '604'
            }
          ]
        },
        {
          'label': '华南',
          'id': '104',
          'pid': '601',
          'children': [
            {
              'label': '广东省',
              'id': '10030',
              'pid': '604'
            },
            {
              'label': '广西壮族自治区',
              'id': '10032',
              'pid': '604'
            },
            {
              'label': '福建省',
              'id': '10033',
              'pid': '604'
            },
            {
              'label': '海南省',
              'id': '10034',
              'pid': '604'
            }
          ]
        }
      ],
      lineProps: {
        children: 'children',
        label: 'label'
      },
      dataSelectLine: [
        {
          'label': '上海（10/50）',
          'children': [
            {
              'label': '上海市(10/50)',
              'children': [
                {
                  'label': '黄浦区(4/20)',
                  'children': [
                    {
                      'label': '晨光官方旗舰店'
                    },
                    {
                      'label': 'mg晨光上海专卖店'
                    },
                    {
                      'label': 'mg晨光上海专卖店'
                    },
                    {
                      'label': 'mg晨光上海专卖店'
                    }
                  ]
                },
                {
                  'label': '黄浦区(3/10)',
                  'children': [
                    {
                      'label': '晨光官方旗舰店'
                    },
                    {
                      'label': 'mg晨光上海专卖店'
                    },
                    {
                      'label': 'mg晨光上海专卖店'
                    }
                  ]
                },
                {
                  'label': '徐汇区(3/20)',
                  'children': [
                    {
                      'label': '晨光徐汇区官方旗舰店'
                    },
                    {
                      'label': 'mg徐汇区专卖店'
                    },
                    {
                      'label': 'mg晨光徐汇区专卖店'
                    }
                  ]
                }
              ]
            }],
          'last': [
            {
              'label': '店铺名称'
            },
            {
              'label': '店铺名称'
            }
          ]
        },
        {
          'label': '江苏（5/50）',
          'children': [
            {
              'label': '晨光官方旗舰店'
            }]
        },
        {
          'label': '浙江（35/50）',
          'children': [{
            'label': '晨光官方旗舰店'
          }]
        }
      ],
      checkAll: false, // 线上是否全选
      isIndeterminate: false,
      defaultCheckedKeys: [5, 8], // 默认选中的项
      defaultCheckedAll: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13], // 全部选中的项
      resultMultilayer: '',
      dialogMultilyaerVisible: false
      // 多层级店铺选择配置项/end
    }
  },
  components: {
    busDraggable
  },
  mounted () {
    // 选中店铺数量
    this.resultMultilayer = this.defaultCheckedKeys.length
    this.isIndeterminate = this.defaultCheckedKeys.length > 0
  },
  computed: {},
  methods: {
    // 多层级店铺选择 event
    // 显示多层级店铺选择器窗口
    handerlMultilayerVisible () {
      this.dialogMultilyaerVisible = true
    },
    handleCheckAllChange (event) {
      this.$refs.online.setCheckedKeys(event.target.checked ? this.defaultCheckedAll : [])
      this.isIndeterminate = false
    },
    handleCheckChange (value) {
      let checkedCount = this.$refs.online.getCheckedNodes().length
      this.checkAll = checkedCount === this.defaultCheckedAll.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.defaultCheckedAll.length
    },
    // 保存选中结果
    saveMultilayerSelect () {
      this.resultMultilayer = this.$refs.online.getCheckedNodes().length
      this.defaultCheckedKeys = this.$refs.online.getCheckedNodes()
      this.dialogMultilyaerVisible = false
    },
    cancleMultilayerSelect () {
      this.defaultCheckedKeys = this.defaultCheckedKeys
      this.dialogMultilyaerVisible = false
    }
    // 多层级店铺选择 event/end
  }
})

