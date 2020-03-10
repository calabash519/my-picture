var admodule = function () {
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, '');
    }
};
admodule.prototype = {
    start: function () {
        var _this = this;
        var markeID = document.getElementsByName("tableId"), MAR_TABLE_ID;
        if (markeID != null && markeID.length > 0) { MAR_TABLE_ID = markeID[0].content; }
        _this.getJsonp("https://mysteelapi.steelphone.com/tpl/tg_newjson_default_hqad.html?callback=tablead&tableid=" + MAR_TABLE_ID, function (a) {
            _this.hqadData = a;
            _this.getdata();
            _this.attachEvent(_this.getClass('sosolink title_hover'), 200);
        }, "tablead")
    },
    getTagName: function (c, b) {
        var a = b || document;
        return typeof (c) == "string" ? a.getElementsByTagName(c) : c
    },
    parseQueryString: function (url) {
        var reg_url = /^[^\?]+\?([\w\W]+)$/,
            reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
            arr_url = reg_url.exec(url),
            ret = {};
        if (arr_url && arr_url[1]) {
            var str_para = arr_url[1], result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
        };
        return ret;
    },
    localTime: function () {
        var local = window.location.pathname, year, month, day, data, datatime;
        local = local.split("/");
        if (local[1] === "m") {
            year = parseFloat("20" + local[2]); month = parseFloat(local[3].substr(0, 2)); day = parseFloat(local[3].substring(2, 4));
            data = new Date(year, (month - 1), day);
            datatime = data.getTime()
            return datatime;
        } else { return new Date().getTime(); }
    },
    getClass: function (className, tagname) {
        if (typeof tagname == 'undefined') tagname = '*';
        if (typeof (getElementsByClassName) == 'function') {
            return getElementsByClassName(className);
        } else {
            var tagname = document.getElementsByTagName(tagname);
            var tagnameAll = [];
            for (var i = 0; i < tagname.length; i++) {
                if (tagname[i].className == className) {
                    tagnameAll[tagnameAll.length] = tagname[i];
                }
            }
            return tagnameAll;
        }
    },
    split_str: function (string, words_per_line) {
        if (typeof string == 'undefined' || string.length == 0) return '';
        if (typeof words_per_line == 'undefined' || isNaN(words_per_line)) {
            words_per_line = 50;
        }
        words_per_line = parseInt(words_per_line);
        var output_string = string.substring(0, 1);
        for (var i = 1; i < string.length; i++) {
            if (i % words_per_line == 0) {
                output_string += "<br/>";
            }
            output_string += string.substring(i, i + 1);
        }
        return output_string;
    },
    titleMouseOver: function (obj, event, words_per_line) {
        var _this = this;
        if (typeof obj.title == 'undefined' || obj.title == '') return false;
        var title_show = document.getElementById("title_show");
        if (title_show == null) {
            title_show = document.createElement("div");
            document.getElementsByTagName('body')[0].appendChild(title_show);
            var attr_id = document.createAttribute('id');
            attr_id.nodeValue = 'title_show';
            title_show.setAttributeNode(attr_id);
            var attr_style = document.createAttribute('style');
            attr_style.nodeValue = 'position:absolute;'
                + 'border:solid 1px #009999; background:#EDEEF0;'
                + 'border-radius:2px;box-shadow:2px 3px #999999;'
                + 'line-height:18px;color:#333'
                + 'font-size:12px; padding: 2px 5px;';
            try {
                title_show.setAttributeNode(attr_style);
            } catch (e) {
                //IE6
                title_show.style.position = 'absolute';
                title_show.style.border = 'solid 2px #009999';
                title_show.style.background = '#fff';
                title_show.style.color = '#333';
                title_show.style.lineHeight = '18px';
                title_show.style.fontSize = '12px';
                title_show.style.padding = '2px 5px';
            }
        }
        document.title_value = obj.title;
        obj.title = '';
        if (typeof words_per_line == 'undefined' || isNaN(words_per_line)) {
            words_per_line = 50;
        }
        words_per_line = parseInt(words_per_line);
        title_show.innerHTML = _this.split_str(document.title_value, words_per_line);
        title_show.style.display = 'block';
        event = event || window.event;
        var top_down = 15;
        var left = Math.min(event.clientX, document.body.clientWidth - title_show.clientWidth);
        function getScrollTop() {
            var scrollTop = 0;
            if (document.documentElement && document.documentElement.scrollTop) {
                scrollTop = document.documentElement.scrollTop;
            }
            else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        }

        title_show.style.left = left + "px";
        title_show.style.top = (event.clientY + top_down + getScrollTop()) + "px";
    },
    titleMouseOut: function (obj) {
        var title_show = document.getElementById("title_show");
        if (title_show == null) return false;
        obj.title = document.title_value;
        title_show.style.display = "none";
    },
    attachEvent: function (objs, words_per_line) {
        var _this = this;
        if (typeof objs != 'object') return false;
        if (typeof words_per_line == 'undefined' || isNaN(words_per_line)) {
            words_per_line = 50;
        }
        for (i = 0; i < objs.length; i++) {
            objs[i].onmouseover = function (event) {
                _this.titleMouseOver(this, event, words_per_line);
            }
            objs[i].onmouseout = function (event) {
                _this.titleMouseOut(this);
            }
        }
    },
    getJsonp: function (src, callback, arg) {
        var r = this.jsonp,
            i = arg,
            s = document.getElementsByTagName("head")[0],
            o = document.createElement("script");
        o.setAttribute("charset", "utf-8"), o.setAttribute("type", "text/javascript");
        var u = !1;
        window[i] = function (e) {
            u = !0, callback(e, r);
            try {
                delete window[i]
            } catch (n) {
                window[i] = null
            }
            o.parentNode.removeChild(o)
        }, o.setAttribute("src", src), s.appendChild(o);
        var a = 15e3;
        a && setTimeout(function () {
            if (u) return;
            try {
                delete window[i]
            } catch (e) {
                window[i] = null
            }
            o && o.parentNode.removeChild(o)
        }, a)
    },
    getdata: function () {
        var _this = this;
        var _data = _this.hqadData,
            marketTable = document.getElementById("marketTable"),
            title = document.getElementsByTagName("title")[0],
            cityname = title.innerHTML.match('^(.*)日(.*)(市场|区域|地区)(.*)$')[2],
            scityname = cityname.replace(/（(.*)）/, ''),
            city = encodeURI(cityname.trim()),
            typeSpan = document.getElementById('typeSpan'),
            markeID = document.getElementsByName("tableId"),
            MAR_TABLE_ID;

        if (markeID != null && markeID.length > 0) { MAR_TABLE_ID = markeID[0].content; }

        for (var i = 0; i < marketTable.rows.length; i++) {
            for (var g = 0; g < marketTable.rows[i].childNodes.length; g++) {
                var node = marketTable.rows[i].childNodes[g];
                if (node.nodeType == 3 && !/\S/.test(node.nodeValue)) {
                    node.parentNode.removeChild(node);
                }
            }
            var newCell = marketTable.rows[i].insertCell(marketTable.rows[i].cells.length);
            if (i == 0) {
                newCell.style.backgroundColor = "#F5F5F5";
                newCell.innerHTML = "";
                continue;
            }
            if (i == 1) continue;
            var thisRows = marketTable.rows[i]
            var cells1 = thisRows.cells[0].innerHTML.trim(),
                cells2 = thisRows.cells[1].innerHTML.trim(),
                cells3 = thisRows.cells[2].innerHTML.trim(),
                cells4 = thisRows.cells[3].innerHTML.trim(),
                cells5 = thisRows.cells[4].innerHTML.trim(),
                cells6 = thisRows.cells[5].innerHTML.trim(),
                cells7 = thisRows.cells[6].innerHTML.trim();

            var breedName = typeSpan ? cells2 : cells1,
                breedName = breedName.replace(/(\#*|\&*|\?*)*/g, ''),
                breedName = encodeURI(breedName.trim());
            thisRows.cells[0].innerHTML = '<a href="http://www.banksteel.com/interface/resource?act=redirect&amp;bd=' + breedName + '&amp;cy=' + city + '&amp;src=mysteel_market" target="_blank" class="sosolink">' + cells1 + '</a>';
            newCell.align = "center";
            newCell.innerHTML = '<a href="http://www.banksteel.com/interface/resource?act=redirect&amp;bd=' + breedName + '&amp;cy=' + city + '&amp;src=mysteel_market" target="_blank" class="sosolink blue">现货</a>';;
            for (var j = 0; j < _data.length; j++) {
                //添加代理
                var pagetime = _this.localTime();
                var showad = true;
                if (_data[j].maxtime) {
                    var timestr = _data[j].maxtime.split("-");
                    var lasttime = (new Date(timestr[0], (timestr[1] - 1), timestr[2])).getTime();
                    if (pagetime >= lasttime) { showad = true; } else { showad = false; }
                }
                if (_data[j].maxtimend) {
                    var timend = _data[j].maxtimend.split("-");
                    var endtime = (new Date(timend[0], (timend[1] - 1), timend[2])).getTime();
                    if (pagetime <= endtime) { showad = true; } else { showad = false; }
                }
                var c1 = typeof _data[j].cell1 !== "undefined" ? _data[j].cell1 : "",
                    c2 = typeof _data[j].cell2 !== "undefined" ? _data[j].cell2.replace(/Φ/g, 'Ф') : "",
                    c3 = typeof _data[j].cell3 !== "undefined" ? _data[j].cell3 : "",
                    c4 = typeof _data[j].cell4 !== "undefined" ? _data[j].cell4 : "",
                    c5 = typeof _data[j].cell5 !== "undefined" ? _data[j].cell5 : "",
                    c6 = typeof _data[j].cell6 !== "undefined" ? _data[j].cell6 : "",
                    _tableid = typeof _data[j].tableID !== "undefined" ? _data[j].tableID : "",
                    you = typeof _data[j].you !== "undefined" ? _data[j].you : false,
                    you1 = typeof _data[j].you1 !== "undefined" ? _data[j].you1 : false,
                    fang = typeof _data[j].fang !== "undefined" ? _data[j].fang : false,
                    tie = typeof _data[j].tie !== "undefined" ? _data[j].tie : false,
                    shi = typeof _data[j].shi !== "undefined" ? _data[j].shi : false,
                    qiao = typeof _data[j].qiao !== "undefined" ? _data[j].qiao : false,
                    gong = typeof _data[j].gong !== "undefined" ? _data[j].gong : false,
                    sui = typeof _data[j].sui !== "undefined" ? _data[j].sui : false;
                c1 = c1 !== "" ? (cells1 === c1) : true; c2 = c2 !== "" ? (cells2.replace(/Φ/g, 'Ф').indexOf(c2) >= 0) : true; c3 = c3 !== "" ? (cells3 === c3) : true; c4 = c4 !== "" ? (cells4 === c4) : true; c5 = c5 !== "" ? (cells5 === c5) : true; c6 = c6 !== "" ? (cells6 === c6) : true; _tableid = _tableid !== "" ? (MAR_TABLE_ID === _tableid) : true;
                if (c1 && c2 && c3 && c4 && c5 && c6 && _tableid && showad) {
                    if (fang || tie || shi || qiao || gong || sui) {
                        if (_data[j].tableID == '80252') {
                            // 2019-07-12 针对80252行情表单处理，调整房、铁、市等顺序
                            if (_data[j].cell1 == '螺纹钢' && _data[j].cell2 == 'Ф18-25' && _data[j].cell3 == 'HRB400E' && _data[j].cell4 == '广钢') {
                                // 80252特殊顺序
                                var ztext = ""
                                if (gong) { ztext += '<a title="公" target="_blank" href="' + gong + '" class="marketftq">公</a>'; }
                                if (shi) { ztext += '<a title="市" target="_blank" href="' + shi + '" class="marketftq">市</a>'; }
                                if (tie) { ztext += '<a title="铁" target="_blank" href="' + tie + '" class="marketftq">铁</a>'; }
                                if (fang) { ztext += '<a title="房" target="_blank" href="' + fang + '" class="marketftq">房</a>'; }
                                if (qiao) { ztext += '<a title="桥" target="_blank" href="' + qiao + '" class="marketftq">桥</a>'; }
                                if (sui) { ztext += '<a title="隧" target="_blank" href="' + sui + '" class="marketftq">隧</a>'; }
                                ztext += "<br>"
                                thisRows.cells[3].innerHTML = ztext + thisRows.cells[3].innerHTML;
                                _data[j].tableTr = true;
                            } else {
                                // 正常顺序
                                var ztext = ""
                                if (fang) { ztext += '<a title="房" target="_blank" href="' + fang + '" class="marketftq">房</a>'; }
                                if (tie) { ztext += '<a title="铁" target="_blank" href="' + tie + '" class="marketftq">铁</a>'; }
                                if (shi) { ztext += '<a title="市" target="_blank" href="' + shi + '" class="marketftq">市</a>'; }
                                if (qiao) { ztext += '<a title="桥" target="_blank" href="' + qiao + '" class="marketftq">桥</a>'; }
                                if (gong) { ztext += '<a title="公" target="_blank" href="' + gong + '" class="marketftq">公</a>'; }
                                if (sui) { ztext += '<a title="隧" target="_blank" href="' + sui + '" class="marketftq">隧</a>'; }
                                ztext += "<br>"
                                thisRows.cells[3].innerHTML = ztext + thisRows.cells[3].innerHTML;
                                _data[j].tableTr = true;
                            }
                        } else {
                            // 正常顺序
                            var ztext = ""
                            if (fang) { ztext += '<a title="房" target="_blank" href="' + fang + '" class="marketftq">房</a>'; }
                            if (tie) { ztext += '<a title="铁" target="_blank" href="' + tie + '" class="marketftq">铁</a>'; }
                            if (shi) { ztext += '<a title="市" target="_blank" href="' + shi + '" class="marketftq">市</a>'; }
                            if (qiao) { ztext += '<a title="桥" target="_blank" href="' + qiao + '" class="marketftq">桥</a>'; }
                            if (gong) { ztext += '<a title="公" target="_blank" href="' + gong + '" class="marketftq">公</a>'; }
                            if (sui) { ztext += '<a title="隧" target="_blank" href="' + sui + '" class="marketftq">隧</a>'; }
                            ztext += "<br>"
                            thisRows.cells[3].innerHTML = ztext + thisRows.cells[3].innerHTML;
                            _data[j].tableTr = true;
                        }
                    }
                    if (_data[j].tableTr) {
                        thisRows.className = "tableTr";
                        thisRows.cells[6].className == "block";
                        thisRows.cells[7].className = "block";
                        thisRows.cells[6].classList.add("block");
                        thisRows.cells[7].classList.add("block");
                        if (!_data[j].info) { newCell.className = "blue" }
                    }
                    if (you) {
                        thisRows.cells[3].innerHTML = thisRows.cells[3].innerHTML + '<a title="2019年度中国钢铁行业优质建筑用钢品牌" target="_blank" href="//www.mysteel.com/topic/2019yzjzyg/index.html"><img src="//a.mysteelcdn.com/common/3.0/you1616.png" width="16" height="16" border="0" align="middle" style="margin-top:2px;_margin-top:0;"></a>';
                    }
                    if (you1) {
                        thisRows.cells[3].innerHTML = thisRows.cells[3].innerHTML + '<a title="2019年中国电弧炉工艺优质建筑用钢品牌" target="_blank" href="//www.mysteel.com/topic/2019yzjzyg/index.html"><img src="//a.mysteelcdn.com/common/3.0/you1616_1.png" width="16" height="16" border="0" align="middle" style="margin-top:2px;_margin-top:0;"></a>';
                    }
                    if (_data[j].info) {
                        var celltext = "代理";
                        if (_data[j].info.text) { celltext = _data[j].info.text }
                        newCell.innerHTML = '<a class="sosolink title_hover" style="color:#F00 !important; font-weight:bold !important;" target="_blank" href="' + _data[j].info.url + '" title="' + _data[j].info.title + '">' + celltext + '</a>';
                    }
                }

            }
        }
    },
    hqadData: []
}
var indexModule = new admodule();
indexModule.start();
