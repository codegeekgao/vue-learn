<template>
  <div class="jsmind_layout">
    <div id="jsmind_container" ref="container" style="width: 700px;height: 750px">
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      dialogVisible: false,
      direction: 'rtl',
      theme_value: '',
      nodeOption: {
        content: '',
        bgColor: '',
        fontColor: '',
        fontSize: '',
        fontWeight: '',
        fontStyle: ''
      },
      mindHeight: '800px',
      themOptions: ['primary', 'warning', 'danger', 'success', 'info', 'greensea', 'nephrite', 'belizehole', 'wisteria', 'asphalt', 'orange', 'pumpkin', 'pomegranate', 'clouds', 'asbestos'],

      options: {
        container: 'jsmind_container', // [必选] 容器的ID
        editable: false, // [可选] 是否启用编辑
        theme: 'orange' // [可选] 主题
      },
      formData: {
        id: '',
        mindCode: '',
        mindName: '',
        mindType: '',
        mindData: '',
        mindOptions: ''
      },
      mindOptions: {
        theme: ''
      },
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      color: 'rgba(255, 69, 0, 0.68)',
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        'rgba(255, 69, 0, 0.68)',
        'rgb(255, 120, 0)',
        'hsv(51, 100, 98)',
        'hsva(120, 40, 94, 0.5)',
        'hsl(181, 100%, 37%)',
        'hsla(209, 100%, 56%, 0.73)',
        '#c7158577'
      ],
      isShow: true
    }
  },
  created () {
    this.mindHeight = (document.body.clientHeight - 90) + 'px'
  },
  mounted() {
    var mind = {
      meta: {
        name: "demo",
        author: "hizzgdev@163.com",
        version: "0.2",
      },
      format: "node_array",
      data: [
        { id: "root", isroot: true, topic: "jsMind" },

        {
          id: "sub1",
          parentid: "root",
          topic: "sub1",
          "background-color": "#0000ff",
        },
        { id: "sub11", parentid: "sub1", topic: "sub11" },
        { id: "sub12", parentid: "sub1", topic: "sub12" },
        { id: "sub13", parentid: "sub1", topic: "sub13" },

        { id: "sub2", parentid: "root", topic: "sub2" },
        { id: "sub21", parentid: "sub2", topic: "sub21" },
        {
          id: "sub22",
          parentid: "sub2",
          topic: "sub22",
          "foreground-color": "#33ff33",
        },

        { id: "sub3", parentid: "root", topic: "sub3" },
      ],
    };

    var options = {
      container: "jsmind_container",
      editable: false,
      theme: "primary",
    };
    var jm = this.jsMind.show(options, mind);
    jm.add_node("sub2", "sub23", "new node", { "background-color": "red" });
    jm.set_node_color("sub21", "green", "#ccc");
  },
  methods: {
    // 缩小
    zoomOut () {
      if (this.jm.view.zoomOut()) {
        this.$refs.zoomOut.disabled = false
      } else {
        this.$refs.zoomOut.disabled = true
      }
    },
    // 放大
    zoomIn () {
      if (this.jm.view.zoomIn()) {
        this.$refs.zoomIn.disabled = false
      } else {
        this.$refs.zoomIn.disabled = true
      }
    },
    // 新增节点
    addNode () {
      let selectedNode = this.jm.get_selected_node() // as parent of new node
      if (!selectedNode) {
        this.$message({
          type: 'warning',
          message: '请先选择一个节点!'
        })
        return
      }
      let nodeid = this.jsMind.util.uuid.newid()
      let topic = 'new Node'
      this.jm.add_node(selectedNode, nodeid, topic)
    },
    // 编辑节点
    editNode () {
      let selectedId = this.get_selected_nodeid()
      if (!selectedId) {
        this.$message({
          type: 'warning',
          message: '请先选择一个节点!'
        })
        return
      }
      let nodeObj = this.jm.get_node(selectedId)
      this.nodeOption.content = nodeObj.topic
      this.nodeOption.bgColor = nodeObj.data['background-color']
      this.nodeOption.fontColor = nodeObj.data['foreground-color']
      this.nodeOption.fontSize = nodeObj.data['font-size']
      this.nodeOption.fontWeight = nodeObj.data['font-weight']
      this.nodeOption.fontStyle = nodeObj.data['font-style']
      this.dialogVisible = true
    },
    sureEditNode () {
      let selectedId = this.get_selected_nodeid()
      this.jm.update_node(selectedId, this.nodeOption.content)
      this.jm.set_node_font_style(selectedId, this.nodeOption.fontSize, this.nodeOption.fontWeight, this.nodeOption.fontStyle)
      this.jm.set_node_color(selectedId, this.nodeOption.bgColor, this.nodeOption.fontColor)
      this.nodeOption = {
        content: '',
        bgColor: '',
        fontColor: '',
        fontSize: '',
        fontWeight: '',
        fontStyle: ''
      }
      this.dialogVisible = false
    },
    // 删除节点
    onRemoveNode () {
      let selectedId = this.get_selected_nodeid()
      if (!selectedId) {
        this.$message({
          type: 'warning',
          message: '请先选择一个节点!'
        })
        return
      }
      this.jm.remove_node(selectedId)
    },
    // 布局方向
    changeOption () {
      if (this.options.mode === 'side') {
        this.options = {
          mode: 'full'
        }
      } else {
        this.options = {
          mode: 'side'
        }
      }
    },
    // 选择主题颜色
    set_theme () {
      this.jm.set_theme(this.theme_value)
    },
    // 获取选中标签的 ID
    get_selected_nodeid () {
      let selectedNode = this.jm.get_selected_node()
      if (selectedNode) {
        return selectedNode.id
      } else {
        return null
      }
    },
    getMind (mindCode) {
      let url = process.env.VUE_APP_BASE_CRUD_PATH + `/api/jsmind/get/` + mindCode
      this.$axios.get(url).then(res => {
        this.formData = res.result
        if (this.formData.mindOptions !== '') {
          this.theme_value = JSON.parse(this.formData.mindOptions).theme
          this.set_theme()
        }
        this.jm.show(JSON.parse(res.result.mindData))
      }).catch(err => {
        console.log(err)
      })
    },
    saveMind () {
      if (this.formData.mindCode === '') {
        this.$message({ type: 'warning', message: '导图编码不能为空!' })
        return
      }
      if (this.formData.mindName === '') {
        this.$message({ type: 'warning', message: '导图名称不能为空!' })
        return
      }
      this.mindOptions.theme = this.theme_value
      this.formData.mindOptions = JSON.stringify(this.mindOptions)
      this.formData.mindData = JSON.stringify(this.jm.get_data())
      let url = process.env.VUE_APP_BASE_CRUD_PATH + `/api/jsmind/save`
      this.$axios.post(url, JSON.stringify(this.formData), {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(res => {
        if (res.resultCode === 500) {
          this.$message({
            type: 'error',
            message: '导图编码已存在!'
          })
        }
        if (res.resultCode === 200) {
          this.$message({
            type: 'success',
            message: '保存成功!'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    deleteMind () {
      this.$confirm('您确定要删除该导图吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let url = process.env.VUE_APP_BASE_CRUD_PATH + `/api/jsmind/delete/` + this.formData.id
        this.$axios.post(url).then(res => {
          if (res.resultCode === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.$router.push('/jsmind')
          location.reload()
        }).catch(err => {
          console.log(err)
        })
      }).catch(() => {
      })
    }
  }
}
</script>
<style type="text/css">

#jsmind_container {
  flex: 1 1 auto;
  position: relative;
}

</style>
