(function ($) {

    var defOpt = {
        is_trigger: true,
        has_search: false,
        only_child: true,
        node_merge: true,
        zIndex: 1,
        choose: false,
        is_node_first: false,
        is_multi: true,
        expand: false, //whether expand
        rootId: 0,
        width: null,
        maxHeight: null,
        data: [],
        isNeedIcon:false,
        onInit: function () {
        },
        onOpen: function () {
        },
        onBeforeOpen: function () {
        },
        onClose: function (has_chg) {
        },
        onChange: function () {
        }
    };

    var searchTimer;

    $.fn.extend({
        roletree: function (opt) {
            return new tree(opt, $(this));
        }
    });

    var tree = function (opt, dom) {
        this.opt = $.extend(true, {}, defOpt, opt);
        this._init(dom);
        return this;
    };

    tree.prototype = {
        _init: function (dom) {
            this.dom = dom;

            this.data = this.opt.data;

            var res = checkData(this.data);
            if (!res) {
                return false;
            }

            this.html = this._makePanel();
            this.opt.onInit();
            this._is_open = false;
            var that = this;

            if (this.opt.choose) {
                var choose = this.opt.choose;
                $.each(choose.nodeId, function (i, n) {
                    var item = {};
                    $.each(that.data, function (i2, n2) {
                        if (n2.id == n && n2.is_node == 1) {
                            item = n2;
                            item.is_check = true;
                        }
                    });
                    that._chgAllChildren(item.id, item.is_check);
                });
                $.each(choose.id, function (i, n) {
                    $.each(that.data, function (i2, n2) {
                        if (n2.id == n && n2.is_node == false) {
                            n2.is_check = true;
                        }
                    });
                });
            }

            this._originId = this.getId();

            if (this.opt.is_trigger) {
                this.dom.off('click.treejs');
                this.dom.on('click.treejs', function (e) {
                    that.start();
                    e.stopPropagation();
                });

                $(document).on('click.treejs', function () {
                    that.end();
                });
            }
        },

        start: function () {
            this.opt.onBeforeOpen();
            this._showPanel();
            this._showData();
            this._is_open = true;
            this.html.find('.search_ipt_s').focus();
            this.opt.onOpen();
            return this;
        },
        end: function () {
            if (this._is_open) {
                this.html.hide();
                this.dom.val(this.getName());
                var ids = this.getId();
                this._is_open = false;
                this.opt.onClose(!(ids == this._originId));
                this._originId = ids;
            }
        },

        getName: function () {
            var text = [];
            var data = this.data;
            if (this.opt.only_child) {
                $.each(data, function (i, n) {
                    if (n.is_check && !n.is_node) {
                        text.push(n.name);
                    }
                });
            } else {
                var node = [];
                $.each(data, function (i, n) {
                    if (n.is_check && n.is_node) {
                        node.push(n.id);
                    }
                });

                var clone = $.extend(true, [], data);
                $.each(clone, function (i, n) {
                    if ((n.is_check && $.inArray(n.nodeId, node) != -1) || !n.is_check) {
                        clone[i] = null;
                    }
                });

                $.each(clone, function (i, n) {
                    if (n) {
                        text.push(n.name);
                    }
                });

            }

            return text.join();
        },
        getId: function () {
            var id = [];
            var nodeId = [];
            var data = this.data;

            if (this.opt.only_child) {
                $.each(data, function (i, n) {
                    if (n.is_check && !n.is_node) {
                        id.push(data[i].id);
                    }
                });

            } else {

                if (this.opt.node_merge) {
                    var node = [];
                    $.each(data, function (i, n) {
                        if (n.is_check && n.is_node) {
                            node.push(n.id);
                        }
                    });

                    var clone = $.extend(true, [], data);
                    $.each(clone, function (i, n) {
                        if ((n.is_check && $.inArray(n.nodeId, node) != -1) || !n.is_check) {
                            clone[i] = null;
                        }
                    });


                    $.each(clone, function (i, n) {
                        if (n) {
                            if (n.is_node) {
                                nodeId.push(data[i].id);
                            } else {
                                id.push(data[i].id);
                            }
                        }
                    });
                } else {
                    $.each(data, function (i, n) {
                        if (n.is_check) {
                            if (n.is_node) {
                                nodeId.push(data[i].id);
                            } else {
                                id.push(data[i].id);
                            }
                        }
                    });
                }


                id = {'id': id, 'nodeId': nodeId};
            }
            return id;
        },
        cancelItem: function (id, type) {
            var item = {};
            var dom = this.html.find('input[data-isNode="' + parseInt(type) + '"][data-id="' + id + '"]').prop('checked', false);
            $.each(this.data, function (i, n) {
                if (n.id == id && n.is_node == type) {
                    item = n;
                    item.is_check = false;
                }
            });

            this._chgItem(item, dom);

        },
        cancelAll: function () {
            $.each(this.data, function (index, item) {
                item.is_check = false;
            });
            this.html.find('input').prop("checked", false);
            this.opt.onChange();
        },
        checkItem: function (id, type) {
            var item = {};
            var dom = this.html.find('input[data-isNode="' + parseInt(type) + '"][data-i="' + id + '"]').prop('checked', true);
            $.each(this.data, function (i, n) {
                if (n.id == id && n.is_node == type) {
                    item = n;
                    item.is_check = true;
                }
            });

            this._chgItem(item, dom);

        },
        checkAll: function () {
            if (this.opt.is_multi) {
                $.each(this.data, function (index, item) {
                    item.is_check = true;
                });
                this.html.find('input').prop("checked", true);
                this.opt.onChange();
            }
        },
        getItem: function () {
            var arr = [];
            var data = this.data;
            if (this.opt.only_child) {
                $.each(data, function (i, n) {
                    if (n.is_check && !n.is_node) {
                        arr.push(n);
                    }
                });
            } else {

                if (this.opt.node_merge) {
                    var node = [];
                    $.each(data, function (i, n) {
                        if (n.is_check && n.is_node) {
                            node.push(n.id);
                        }
                    });

                    var clone = $.extend(true, [], data);
                    $.each(clone, function (i, n) {
                        if ((n.is_check && $.inArray(n.nodeId, node) != -1) || !n.is_check) {
                            clone[i] = null;
                        }
                    });


                    $.each(clone, function (i, n) {
                        if (n) {
                            arr.push(n);
                        }
                    });
                } else {
                    $.each(data, function (i, n) {
                        if (n.is_check) {
                            arr.push(n);
                        }
                    });
                }


            }
            return arr;
        },
        search: function (val) {
            this._removeLayer(this.opt.rootId);

            if (val === '') {
                this.html.find('div[node-id="' + this.opt.rootId + '"]').remove();
                this._showLayer(this.opt.rootId);
            } else {
                for (var i in this.data) {
                    if (!this.data[i].is_node && this.data[i].name.indexOf(val) != -1) {
                        this.html.find('div[node-id="' + this.opt.rootId + '"]').append(this._makeItem(this.data[i]));
                    }
                }
            }
        },

        _showPanel: function () {
            if (this.opt.is_trigger) {
                this.html.css({
                    top: this.dom.position().top + this.dom.outerHeight(),
                    left: this.dom.position().left,
                    minWidth: this.opt.width ? this.opt.width : this.dom.outerWidth()
                });

                this.html.on('click', function (e) {
                    e.stopPropagation();
                });

                this.dom.after(this.html);

            } else {
                this.dom.append(this.html);
            }

        },
        _showData: function () {
            if (!this.html.find('input[type="checkbox"]').length) {
                this._showLayer(this.opt.rootId);
            } else {
                this.html.show();
            }
        },
        _showLayer: function (layer) {
            var showData = this._getLayerData(layer);
            var itemDiv = makeLayer();


            if (layer === this.opt.rootId) {
                itemDiv = $(itemDiv).attr('node-id', this.opt.rootId);
                itemDiv.addClass('tree_node');
                itemDiv.removeClass('tree_content');
                this.html.append( $('<div class="tree_node_header"></div>').append(itemDiv));

            } else {
                this.html.find('div[node-id="' + layer + '"]').append(itemDiv);
                this.html.find('div[node-id="' + layer + '"] span:first').html(makeShrink());
            }

            for (var i in showData) {

                itemDiv.append( $('<div class="tree_item_header"></div>').append(this._makeItem(showData[i])));
            }
        },
        _removeLayer: function (layer) {
            this.html.find('div[node-id="' + layer + '"]>div').remove();
            this.html.find('div[node-id="' + layer + '"] span:first').html(makeExpand());

        },

        _makePanel: function () {
            var html = '<div></div>';

            if (this.opt.has_search) {
                html = this._makeSearch(html);
            }

            var css;
            if (this.opt.is_trigger) {
                css = {
                    'font-family': 'Microsoft YaHei',
                    'z-index': this.opt.zIndex,
                    border: '1px solid #5d5d5d',
                    'background': '#fff',
                    position: 'absolute',
                    maxHeight: this.opt.maxHeight,
                    'white-space': 'nowrap',
                    'overflow': 'auto'
                };
            } else {
                css = {
                    'font-family': 'Microsoft YaHei',
                    'background': '#fff',
                    maxHeight: this.opt.maxHeight,
                    'white-space': 'nowrap',
                    'overflow': 'auto'
                };
            }
            return $(html).css(css);
        },
        _makeSearch: function (html) {
            var search = '<input class="search_ipt_s" type="text" placeholder="' + t('search') + '"/></div>';
            search = $(search).css({
                'border': 'none',
                'padding': '4px 0',
                'margin': '5px 0 0 0'
            });

            var obj = this;
            $(search).on('keyup paste', function () {
                var dom = this;
                clearTimeout(searchTimer);
                searchTimer = setTimeout(function () {
                    obj.search(dom.value);
                }, 100);
            });

            return $(html).append(search);

        },
        _makeIcon:function (item) {
            var icon_class = '';
            if(item.id[0] == 'c' || item['type'] =='com'){
                icon_class = 'icon_com';
            }else{
                icon_class = 'icon_dept';
            }
            var html = '<i data-v-b33c931a="" class="x-tree-item-icon iconfont '+icon_class+'"></i>';

            return $(html).css({

            })[0].outerHTML;
        },
        _makeNode: function (item) {
            var $html;
            var html = '';
            // if(item.id !=0 || typeof parseInt(item.id) !== NaN){
            //     html +='<div class="tree_item_header">'
            // }
            var icon = '';
            if(this.opt.isNeedIcon){
                icon =  this._makeIcon(item);
            }
            if (this.opt.is_multi) {
                html += '<div class="tree_item" node-id="' + item.id + '">' + makeExpand()+'<input type="checkbox" data-isNode="1" data-id="' + item.id + '" ' + (item.is_check ? 'checked' : '') + ' data-name="' + item.name + '"/>'+icon+'<span>' + item.name + '</span></div>';
            }
            else {
                if (this.opt.only_child) {
                    html +='<div class="tree_item" node-id="' + item.id + '">' + makeExpand() +icon+ '<span>' + item.name + '</span></div>';

                }
                else {
                    html +='<div class="tree_item" node-id="' + item.id + '">' + makeExpand() +'<label><input type="radio" name="' + this.dom.selector + '" data-isNode="1" data-id="' + item.id + '" ' + (item.is_check ? 'checked' : '') + ' data-name="' + item.name + '"/>'+icon+'<span>' + item.name + '</span></label></div>';

                }
            }
            // if(item.id !=0 || typeof parseInt(item.id) !== NaN){
            //     html +='</div>'
            // }
            $html = $(html);
            $html.find('span').css({
                'cursor': 'pointer',
                'user-select': 'none',
                '-webkit-user-select': 'none',
                '-moz-user-select': 'none',
                '-ms-user-select': 'none'
            });
            var obj = this;
            $html.find('span').on('click', function (e) {
                if (!$html.find('div')[0]) {
                    obj._showLayer(item.id);
                } else {
                    obj._removeLayer(item.id);
                }
                //e.stopPropagation();
            });

            return $html;
        },
        _makeChild: function (item) {
            var $html;
            var icon = '';
            if(this.opt.isNeedIcon){
                icon =  this._makeIcon();
            }
            if (this.opt.is_multi) {
                $html = $('<div class="tree_item"><span></span><label><input type="checkbox" data-id="' + item.id + '" data-isNode="0" data-name="' + item.name + '" ' + (item.is_check ? 'checked' : '') + '/>'+icon+'' + item.name + '</label></div>');
            }
            else {
                $html = $('<div class="tree_item">' + (this.opt.only_child ? '' : '<span></span>') + '<label><input type="radio" name="' + this.dom.selector + '" data-id="' + item.id + '" data-isNode="0" data-name="' + item.name + '" />'+icon+'' + item.name + '</label></div>');
            }
            $html.find('span').css({
                'width': '16px',
                'user-select': 'none',
                '-webkit-user-select': 'none',
                '-moz-user-select': 'none',
                '-ms-user-select': 'none',
                'display': 'inline-block'
            });
            $html.find('input').css({
                'padding': '2px 0 0 0'
            });
            return $html;
        },
        _makeItem: function (item) {
            var $html;
            if (item.is_node) {
                $html = this._makeNode(item);
            } else {
                $html = this._makeChild(item);
            }

            var obj = this;
            $html.find('input').on('click', function () {
                if (obj.opt.is_multi) {
                    item.is_check = !item.is_check;
                    obj._chgItem(item, $(this));
                }
                else {
                    $.each(obj.data, function (index, item) {
                        item.is_check = false;
                    });
                    obj.html.find('input').prop("checked", false);
                    item.is_check = true;
                    $(this).prop('checked', true);
                    obj.opt.onChange();
                }
            });

            return $html;
        },


        _getLayerData: function (parent) {
            var res = [];
            for (var i in this.data) {
                if (this.data[i].nodeId == parent) {
                    res.push(this.data[i]);
                }
            }
            return res;
        },

        _chgItem: function (item, dom) {
            if (item.is_node) {
                dom.parent().find('input').prop('checked', item.is_check);
                this._chgAllChildren(item.id, item.is_check);
            }

            if (!item.is_check) {
                this._cancelParentNode(item.nodeId);
            } else {
                //this._checkParentNode(item.nodeId);
            }

            this.opt.onChange();
        },
        _cancelParentNode: function (id) {
            var obj = this;
            $.each(obj.data, function (i, n) {
                if (n.id == id && n.is_node && n.is_check) {
                    n.is_check = false;
                    obj.html.find('input[data-isNode="1"][data-id="' + id + '"]').prop('checked', false);
                    obj._cancelParentNode(n.nodeId);
                }
            })
        },
        _checkParentNode: function (id) {
            var obj = this;
            var allChildrenChecked = true;
            $.each(obj.data, function (i, n) {
                if (n.nodeId == id && !n.is_check) {
                    allChildrenChecked = false;
                }
            });
            $.each(obj.data, function (i, n) {
                if (n.id == id && n.is_node && !n.is_check && allChildrenChecked) {
                    n.is_check = true;
                    obj.html.find('input[data-isNode="1"][data-id="' + id + '"]').prop('checked', true);
                    obj._checkParentNode(n.nodeId);
                }
            });
        },
        _chgAllChildren: function (nodeid, bol) {
            var obj = this;
            $.each($.extend(true, [], this.data), function (i, n) {
                if (n.nodeId == nodeid) {
                    obj.data[i].is_check = bol;
                    if (n.is_node) {
                        obj._chgAllChildren(n.id, bol);
                    }
                }
            });
        }
    };


    function makeLayer() {
        var html = '<div class="tree_content"></div>';

        return $(html).css({
            'margin-left': '13px',
        });
    }

    function makeExpand() {
        var html = '<span>＋</span>';

        return $(html).css({
            'font-size': '16px',
            'font-weight': 'bold',
            // 'vertical-align': 'middle',
            'padding-right': '0px'
        })[0].outerHTML;
    }

    function makeShrink() {
        var html = '<span>－</span>';

        return $(html).css({
            'font-size': '16px',
            'font-weight': 'bold',
            // 'vertical-align': 'middle',
            'padding-right': '0px'
        })[0].outerHTML;
    }

    function checkData(data) {
        for (var i in data) {
            return typeof data[i] == 'object';
        }
        return false;
    }

})($);
