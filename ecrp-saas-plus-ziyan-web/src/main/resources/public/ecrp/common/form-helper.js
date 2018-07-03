define([], function() {
	var helper = {
			$validAndSubmit: function(options) {
				var $this = this;
				this.$refs.form.validate(function(state){
					if(state)
						$this.$submit(options);
				})
			},
			
			$submit: function(options) {
				var $this = this;
				function resolver(params) {
					$.ajax({
						url: options && options.url || $this.url,
						data: params,
						type: "post",
						dataType: options && options.type || "json",
						success: function(data,ts,xhr) {
							 if(options && options.success && typeof options.success === "function") {
							 	options.success(data, ts, xhr, $this);
							 }
						},
						error: function(xhr, ts, error) {
							if(options && options.error && typeof options.error === "function") {
							 	options.error(xhr, ts, error, $this);
							 }
						},
						complete:function(xhr, ts) {
							if(options && options.complete && typeof options.complete === "function") {
							 	options.complete(data, ts, $this);
							 }
						}
					})
				}
			
				var params = $.extend(true,{},this.model);
				
				if(options && options.handleParams && typeof options.handleParams === "function") {
					resolver(options.handleParams(params));
				} else {
					resolver(params);
				}
			},
			
			$resetFields() {
				this.$refs.form.resetFields();
			},
			
			$setModel(model) {
				if(typeof model !== "object") {
					throw new Error("illegal arguments, 'model' must be object");
				}
				this.$set(this, "model", model);
			},
			
			$getModel() {
				return $.extend(true, {}, this.model);
			}
		}
	
	return Object.assign({}, helper);
})