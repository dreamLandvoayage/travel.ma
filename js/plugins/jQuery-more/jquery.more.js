(function($){var pluginName='more';$.JQPlugin.createPlugin({name:pluginName,defaultOptions:{length:100,leeway:5,wordBreak:false,ignoreTags:['br','hr','img'],toggle:true,ellipsisText:'...',moreText:'Show more',lessText:'Show less',andNext:'',onChange:null},_ellipsisClass:pluginName+'-ellipsis',_linkClass:pluginName+'-link',_hiddenClass:pluginName+'-hidden',_tagName:/^<(\w+).*>$/,_instSettings:function(elem,options){return{html:elem.html()};},_optionsChanged:function(elem,inst,options){var self=this;$.extend(inst.options,options);this._preDestroy(elem,inst);var html='';if(elem.text().length>inst.options.length+inst.options.leeway){var matches=elem.html().match(/(<[^>]+>)|([^<]+)/g);var i=0;var pos=0;var tags=[];for(;i<matches.length;i++){if(matches[i][0]==='<'){if(matches[i][1]==='/'||matches[i][matches[i].length-2]==='/'){tags.pop();}
else if($.inArray(matches[i].toLowerCase().replace(this._tagName,'$1'),inst.options.ignoreTags)===-1){tags.push(matches[i]);}}
else if(pos+matches[i].length>inst.options.length){break;}
else{pos+=matches[i].length;}}
pos=inst.options.length-pos;if(inst.options.wordBreak){var matched=matches[i].substring(0,pos+1).replace('\n',' ').match(/^.*\W/m);pos=(matched?matched[0].length-1:pos);}
var closeTags=function(tags){var html='';for(var i=tags.length-1;i>=0;i--){html+='</'+tags[i].replace(self._tagName,'$1')+'>';}
return html;};html=matches.slice(0,i).join('')+matches[i].substring(0,pos)+closeTags(tags)+
'<span class="'+this._ellipsisClass+'">'+inst.options.ellipsisText+'</span>'+
'<span class="'+this._hiddenClass+'">'+tags.join('')+
matches[i].substring(pos)+closeTags(tags)+matches.slice(i+1).join('')+'</span>';}
else if(options.andNext&&elem.nextAll(options.andNext).length){html=elem.html();}
if(html){html+='<a href="#" class="btn '+this._linkClass+'">'+inst.options.moreText+'</a>';elem.html(html).find('a.'+this._linkClass).click(function(event){var link=$(this);var expanding=link.html()===inst.options.moreText;link.html(expanding?inst.options.lessText:inst.options.moreText).siblings('span.'+self._ellipsisClass+',span.'+self._hiddenClass).toggle();if(options.andNext){link.parent().nextAll(options.andNext).toggle();}
if(!inst.options.toggle){link.remove();}
if($.isFunction(inst.options.onChange)){inst.options.onChange.apply(elem,[expanding]);}
event.stopPropagation();return false;});if(options.andNext){elem.nextAll(options.andNext).hide();}}},_preDestroy:function(elem,inst){elem.html(inst.html);if(inst.options.andNext){elem.nextAll(inst.options.andNext).show();}}});})(jQuery);