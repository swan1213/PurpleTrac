(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c6610524"],{1148:function(e,t,a){"use strict";var r=a("da84"),n=a("5926"),o=a("577e"),s=a("1d80"),i=r.RangeError;e.exports=function(e){var t=o(s(this)),a="",r=n(e);if(r<0||r==1/0)throw i("Wrong number of repetitions");for(;r>0;(r>>>=1)&&(t+=t))1&r&&(a+=t);return a}},"12aa":function(e,t,a){"use strict";a.d(t,"a",(function(){return h}));var r=a("2b0e"),n=a("b42e"),o=a("c637"),s=a("a723"),i=a("d82f"),c=a("cf75"),l=a("1947");function d(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function p(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?d(Object(a),!0).forEach((function(t){b(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):d(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function b(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var u=Object(c["d"])(Object(i["m"])(p(p({},Object(i["k"])(l["b"],["size"])),{},{ariaRole:Object(c["c"])(s["u"],"group"),size:Object(c["c"])(s["u"]),tag:Object(c["c"])(s["u"],"div"),vertical:Object(c["c"])(s["g"],!1)})),o["k"]),h=r["default"].extend({name:o["k"],functional:!0,props:u,render:function(e,t){var a=t.props,r=t.data,o=t.children;return e(a.tag,Object(n["a"])(r,{class:b({"btn-group":!a.vertical,"btn-group-vertical":a.vertical},"btn-group-".concat(a.size),a.size),attrs:{role:a.ariaRole}}),o)}})},"25f0":function(e,t,a){"use strict";var r=a("5e77").PROPER,n=a("cb2d"),o=a("825a"),s=a("577e"),i=a("d039"),c=a("90d8"),l="toString",d=RegExp.prototype,p=d[l],b=i((function(){return"/a/b"!=p.call({source:"a",flags:"b"})})),u=r&&p.name!=l;(b||u)&&n(RegExp.prototype,l,(function(){var e=o(this),t=s(e.source),a=s(c(e));return"/"+t+"/"+a}),{unsafe:!0})},"40a8":function(e,t,a){},"90d8":function(e,t,a){var r=a("c65b"),n=a("1a2d"),o=a("3a9b"),s=a("ad6d"),i=RegExp.prototype;e.exports=function(e){var t=e.flags;return void 0!==t||"flags"in i||n(e,"flags")||!o(i,e)?t:r(s,e)}},a28c:function(e,t,a){"use strict";a("40a8")},b28b:function(e,t,a){"use strict";a.d(t,"a",(function(){return w}));var r=a("b42e"),n=a("c637"),o=a("a723"),s=a("992e"),i=a("2326"),c=a("228e"),l=a("6c06"),d=a("7b1e"),p=a("b508"),b=a("d82f"),u=a("cf75"),h=a("fa73");function f(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function m(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?f(Object(a),!0).forEach((function(t){g(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function g(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var x=["auto","start","end","center","baseline","stretch"],C=function(e,t,a){var r=e;if(!Object(d["p"])(a)&&!1!==a)return t&&(r+="-".concat(t)),"col"!==e||""!==a&&!0!==a?(r+="-".concat(a),Object(h["c"])(r)):Object(h["c"])(r)},O=Object(p["a"])(C),v=Object(b["c"])(null),y=function(){var e=Object(c["b"])().filter(l["a"]),t=e.reduce((function(e,t){return e[t]=Object(u["c"])(o["i"]),e}),Object(b["c"])(null)),a=e.reduce((function(e,t){return e[Object(u["g"])(t,"offset")]=Object(u["c"])(o["p"]),e}),Object(b["c"])(null)),r=e.reduce((function(e,t){return e[Object(u["g"])(t,"order")]=Object(u["c"])(o["p"]),e}),Object(b["c"])(null));return v=Object(b["a"])(Object(b["c"])(null),{col:Object(b["h"])(t),offset:Object(b["h"])(a),order:Object(b["h"])(r)}),Object(u["d"])(Object(b["m"])(m(m(m(m({},t),a),r),{},{alignSelf:Object(u["c"])(o["u"],null,(function(e){return Object(i["a"])(x,e)})),col:Object(u["c"])(o["g"],!1),cols:Object(u["c"])(o["p"]),offset:Object(u["c"])(o["p"]),order:Object(u["c"])(o["p"]),tag:Object(u["c"])(o["u"],"div")})),n["y"])},w={name:n["y"],functional:!0,get props(){return delete this.props,this.props=y()},render:function(e,t){var a,n=t.props,o=t.data,i=t.children,c=n.cols,l=n.offset,d=n.order,p=n.alignSelf,b=[];for(var u in v)for(var h=v[u],f=0;f<h.length;f++){var m=O(u,h[f].replace(u,""),n[h[f]]);m&&b.push(m)}var x=b.some((function(e){return s["e"].test(e)}));return b.push((a={col:n.col||!x&&!c},g(a,"col-".concat(c),c),g(a,"offset-".concat(l),l),g(a,"order-".concat(d),d),g(a,"align-self-".concat(p),p),a)),e(n.tag,Object(r["a"])(o,{class:b}),i)}}},b6802:function(e,t,a){"use strict";var r=a("23e7"),n=a("da84"),o=a("e330"),s=a("5926"),i=a("408a"),c=a("1148"),l=a("d039"),d=n.RangeError,p=n.String,b=Math.floor,u=o(c),h=o("".slice),f=o(1..toFixed),m=function(e,t,a){return 0===t?a:t%2===1?m(e,t-1,a*e):m(e*e,t/2,a)},g=function(e){var t=0,a=e;while(a>=4096)t+=12,a/=4096;while(a>=2)t+=1,a/=2;return t},x=function(e,t,a){var r=-1,n=a;while(++r<6)n+=t*e[r],e[r]=n%1e7,n=b(n/1e7)},C=function(e,t){var a=6,r=0;while(--a>=0)r+=e[a],e[a]=b(r/t),r=r%t*1e7},O=function(e){var t=6,a="";while(--t>=0)if(""!==a||0===t||0!==e[t]){var r=p(e[t]);a=""===a?r:a+u("0",7-r.length)+r}return a},v=l((function(){return"0.000"!==f(8e-5,3)||"1"!==f(.9,0)||"1.25"!==f(1.255,2)||"1000000000000000128"!==f(0xde0b6b3a7640080,0)}))||!l((function(){f({})}));r({target:"Number",proto:!0,forced:v},{toFixed:function(e){var t,a,r,n,o=i(this),c=s(e),l=[0,0,0,0,0,0],b="",f="0";if(c<0||c>20)throw d("Incorrect fraction digits");if(o!=o)return"NaN";if(o<=-1e21||o>=1e21)return p(o);if(o<0&&(b="-",o=-o),o>1e-21)if(t=g(o*m(2,69,1))-69,a=t<0?o*m(2,-t,1):o/m(2,t,1),a*=4503599627370496,t=52-t,t>0){x(l,0,a),r=c;while(r>=7)x(l,1e7,0),r-=7;x(l,m(10,r,1),0),r=t-1;while(r>=23)C(l,1<<23),r-=23;C(l,1<<r),x(l,1,1),C(l,2),f=O(l)}else x(l,0,a),x(l,1<<-t,0),f=O(l)+u("0",c);return c>0?(n=f.length,f=b+(n<=c?"0."+u("0",c-n)+f:h(f,0,n-c)+"."+h(f,n-c))):f=b+f,f}})},c346:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-row",{staticClass:"match-height"},[a("b-col",{attrs:{cols:"12"}},[a("p",{staticClass:"mb-2"},[a("span",[e._v("A Vue.js component for ApexCharts. Read full documnetation")]),a("b-link",{attrs:{target:"_blank",href:"https://apexcharts.com/docs/installation/"}},[e._v(" here ")])],1)]),a("b-col",{attrs:{cols:"12"}},[a("apex-line-area-chart")],1),a("b-col",{attrs:{cols:"12"}},[a("apex-data-bar-chart")],1),a("b-col",{attrs:{cols:"12"}},[a("apex-scatter-chart")],1),a("b-col",{attrs:{cols:"12"}},[a("apex-line-chart")],1),a("b-col",{attrs:{md:"6"}},[a("apex-bar-chart")],1),a("b-col",{attrs:{md:"6"}},[a("apex-candlestick-chart")],1),a("b-col",{attrs:{md:"6"}},[a("apex-heat-map-chart")],1),a("b-col",{attrs:{md:"6"}},[a("apex-radial-bar-chart")],1),a("b-col",{attrs:{md:"6"}},[a("apex-radar-chart")],1),a("b-col",{attrs:{md:"6"}},[a("apex-donut-chart")],1)],1)},n=[],o=a("a15b"),s=a("b28b"),i=a("aa59"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{attrs:{"no-body":""}},[a("b-card-header",[a("div",[a("b-card-title",{staticClass:"mb-1"},[e._v(" Balance ")]),a("b-card-sub-title",[e._v("Commercial networks & enterprises")])],1),a("div",{staticClass:"d-flex align-items-center flex-wrap mt-sm-0 mt-1"},[a("h5",{staticClass:"font-weight-bolder mb-0 mr-1"},[e._v(" $ 100,000 ")]),a("b-badge",{attrs:{variant:"light-secondary"}},[a("feather-icon",{staticClass:"text-danger mr-25",attrs:{icon:"ArrowDownIcon",size:"16"}}),a("span",{staticClass:"align-middle"},[e._v("20%")])],1)],1)]),a("b-card-body",[a("vue-apex-charts",{attrs:{type:"line",height:"400",options:e.apexChatData.lineChartSimple.chartOptions,series:e.apexChatData.lineChartSimple.series}})],1)],1)},l=[],d=a("b885"),p=a("205f"),b=a("e98b"),u=a("6197"),h=a("4968"),f=a("ba06"),m=a("1321"),g=a.n(m),x=(a("d3b7"),a("25f0"),a("b6802"),a("1dff"));function C(e,t){var a=0,r=[];while(a<e){var n="w".concat((a+1).toString()),o=Math.floor(Math.random()*(t.max-t.min+1))+t.min;r.push({x:n,y:o}),a++}return r}var O={column:{series1:"#826af9",series2:"#d2b0ff",bg:"#f8d3ff"},success:{shade_100:"#7eefc7",shade_200:"#06774f"},donut:{series1:"#ffe700",series2:"#00d4bd",series3:"#826bf8",series4:"#2b9bf4",series5:"#FFA1A1"},area:{series3:"#a4f8cd",series2:"#60f2ca",series1:"#2bdac7"}},v={lineChartSimple:{series:[{data:[280,200,220,180,270,250,70,90,200,150,160,100,150,100,50]}],chartOptions:{chart:{zoom:{enabled:!1},toolbar:{show:!1}},markers:{strokeWidth:7,strokeOpacity:1,strokeColors:[x["b"].light],colors:[x["b"].warning]},colors:[x["b"].warning],dataLabels:{enabled:!1},stroke:{curve:"straight"},grid:{xaxis:{lines:{show:!0}}},tooltip:{custom:function(e){return'<div class="px-1 py-50"><span>'.concat(e.series[e.seriesIndex][e.dataPointIndex],"%</span></div>")}},xaxis:{categories:["7/12","8/12","9/12","10/12","11/12","12/12","13/12","14/12","15/12","16/12","17/12","18/12","19/12","20/12","21/12"]},yaxis:{}}},lineAreaChartSpline:{series:[{name:"Visits",data:[100,120,90,170,130,160,140,240,220,180,270,280,375]},{name:"Clicks",data:[60,80,70,110,80,100,90,180,160,140,200,220,275]},{name:"Sales",data:[20,40,30,70,40,60,50,140,120,100,140,180,220]}],chartOptions:{chart:{toolbar:{show:!1}},dataLabels:{enabled:!1},stroke:{show:!1,curve:"straight"},legend:{show:!0,position:"top",horizontalAlign:"left",fontSize:"14px",fontFamily:"Montserrat"},grid:{xaxis:{lines:{show:!0}}},xaxis:{categories:["7/12","8/12","9/12","10/12","11/12","12/12","13/12","14/12","15/12","16/12","17/12","18/12","19/12","20/12"]},yaxis:{},fill:{opacity:1,type:"solid"},tooltip:{shared:!1},colors:[O.area.series3,O.area.series2,O.area.series1]}},columnChart:{series:[{name:"Apple",data:[90,120,55,100,80,125,175,70,88,180]},{name:"Samsung",data:[85,100,30,40,95,90,30,110,62,20]}],chartOptions:{chart:{stacked:!0,toolbar:{show:!1}},colors:[O.column.series1,O.column.series2],plotOptions:{bar:{columnWidth:"15%",colors:{backgroundBarColors:[O.column.bg,O.column.bg,O.column.bg,O.column.bg,O.column.bg],backgroundBarRadius:10}}},dataLabels:{enabled:!1},legend:{show:!0,position:"top",fontSize:"14px",fontFamily:"Montserrat",horizontalAlign:"left"},stroke:{show:!0,colors:["transparent"]},grid:{xaxis:{lines:{show:!0}}},xaxis:{categories:["7/12","8/12","9/12","10/12","11/12","12/12","13/12","14/12","15/12","16/12"]},yaxis:{},fill:{opacity:1}}},barChart:{series:[{data:[700,350,480,600,210,550,150]}],chartOptions:{chart:{toolbar:{show:!1}},colors:x["b"].info,plotOptions:{bar:{horizontal:!0,barHeight:"30%",endingShape:"rounded"}},grid:{xaxis:{lines:{show:!1}}},dataLabels:{enabled:!1},xaxis:{categories:["MON, 11","THU, 14","FRI, 15","MON, 18","WED, 20","FRI, 21","MON, 23"]},yaxis:{}}},candlestickChart:{series:[{data:[{x:new Date(15387786e5),y:[150,170,50,100]},{x:new Date(15387804e5),y:[200,400,170,330]},{x:new Date(15387822e5),y:[330,340,250,280]},{x:new Date(1538784e6),y:[300,330,200,320]},{x:new Date(15387858e5),y:[320,450,280,350]},{x:new Date(15387876e5),y:[300,350,80,250]},{x:new Date(15387894e5),y:[200,330,170,300]},{x:new Date(15387912e5),y:[200,220,70,130]},{x:new Date(1538793e6),y:[220,270,180,250]},{x:new Date(15387948e5),y:[200,250,80,100]},{x:new Date(15387966e5),y:[150,170,50,120]},{x:new Date(15387984e5),y:[110,450,10,420]},{x:new Date(15388002e5),y:[400,480,300,320]},{x:new Date(1538802e6),y:[380,480,350,450]}]}],chartOptions:{chart:{toolbar:{show:!1}},xaxis:{type:"datetime"},yaxis:{tooltip:{enabled:!0}},grid:{xaxis:{lines:{show:!0}}},legend:{show:!1},plotOptions:{candlestick:{colors:{upward:x["b"].success,downward:x["b"].danger}},bar:{columnWidth:"40%"}}}},scatterChart:{series:[{name:"Angular",data:[[5.4,170],[5.4,100],[6.3,170],[5.7,140],[5.9,130],[7,150],[8,120],[9,170],[10,190],[11,220],[12,170],[13,230]]},{name:"Vue",data:[[14,220],[15,280],[16,230],[18,320],[17.5,280],[19,250],[20,350],[20.5,320],[20,320],[19,280],[17,280],[22,300],[18,120]]},{name:"React",data:[[14,290],[13,190],[20,220],[21,350],[21.5,290],[22,220],[23,140],[19,400],[20,200],[22,90],[20,120]]}],chartOptions:{chart:{zoom:{enabled:!0,type:"xy"},toolbar:{show:!1}},grid:{xaxis:{lines:{show:!0}}},colors:[x["b"].warning,x["b"].primary,x["b"].success],legend:{show:!0,position:"top",horizontalAlign:"left"},xaxis:{tickAmount:10,labels:{formatter:function(e){return parseFloat(e).toFixed(1)}}},yaxis:{}}},heatMapChart:{series:[{name:"SUN",data:C(24,{min:0,max:60})},{name:"MON",data:C(24,{min:0,max:60})},{name:"TUE",data:C(24,{min:0,max:60})},{name:"WED",data:C(24,{min:0,max:60})},{name:"THU",data:C(24,{min:0,max:60})},{name:"FRI",data:C(24,{min:0,max:60})},{name:"SAT",data:C(24,{min:0,max:60})}],chartOptions:{dataLabels:{enabled:!1},legend:{show:!0,position:"bottom"},colors:["#7367F0"],plotOptions:{heatmap:{enableShades:!1,colorScale:{ranges:[{from:0,to:10,name:"0-10",color:"#b9b3f8"},{from:11,to:20,name:"10-20",color:"#aba4f6"},{from:21,to:30,name:"20-30",color:"#9d95f5"},{from:31,to:40,name:"30-40",color:"#8f85f3"},{from:41,to:50,name:"40-50",color:"#8176f2"},{from:51,to:60,name:"50-60",color:"#7367f0"}]}}},xaxis:{labels:{show:!1},axisBorder:{show:!1},axisTicks:{show:!1}},chart:{height:350,type:"heatmap",toolbar:{show:!1}}}},donutChart:{series:[85,16,50,50],chartOptions:{legend:{show:!0,position:"bottom",fontSize:"14px",fontFamily:"Montserrat"},colors:[O.donut.series1,O.donut.series5,O.donut.series3,O.donut.series2],dataLabels:{enabled:!0,formatter:function(e){return"".concat(parseInt(e),"%")}},plotOptions:{pie:{donut:{labels:{show:!0,name:{fontSize:"2rem",fontFamily:"Montserrat"},value:{fontSize:"1rem",fontFamily:"Montserrat",formatter:function(e){return"".concat(parseInt(e),"%")}},total:{show:!0,fontSize:"1.5rem",label:"Operational",formatter:function(){return"31%"}}}}}},labels:["Operational","Networking","Hiring","R&D"],responsive:[{breakpoint:992,options:{chart:{height:380},legend:{position:"bottom"}}},{breakpoint:576,options:{chart:{height:320},plotOptions:{pie:{donut:{labels:{show:!0,name:{fontSize:"1.5rem"},value:{fontSize:"1rem"},total:{fontSize:"1.5rem"}}}}},legend:{show:!0}}}]}},radialBarChart:{series:[80,50,35],chartOptions:{colors:[O.donut.series1,O.donut.series2,O.donut.series4],plotOptions:{radialBar:{size:185,hollow:{size:"25%"},track:{margin:15},dataLabels:{name:{fontSize:"2rem",fontFamily:"Montserrat"},value:{fontSize:"1rem",fontFamily:"Montserrat"},total:{show:!0,fontSize:"1rem",label:"Comments",formatter:function(){return"80%"}}}}},legend:{show:!0,position:"bottom",horizontalAlign:"center"},stroke:{lineCap:"round"},labels:["Comments","Replies","Shares"]}},radarChart:{series:[{name:"iPhone 11",data:[41,64,81,60,42,42,33,23]},{name:"Samsung s20",data:[65,46,42,25,58,63,76,43]}],chartOptions:{chart:{toolbar:{show:!1},dropShadow:{enabled:!1,blur:8,left:1,top:1,opacity:.2}},legend:{show:!0,fontSize:"14px",fontFamily:"Montserrat"},yaxis:{show:!1},colors:[O.donut.series1,O.donut.series3],xaxis:{categories:["Battery","Brand","Camera","Memory","Storage","Display","OS","Price"]},fill:{opacity:[1,.8]},stroke:{show:!1,width:0},markers:{size:0},grid:{show:!1}}}},y={components:{VueApexCharts:g.a,BCardHeader:d["a"],BCard:p["a"],BBadge:b["a"],BCardBody:u["a"],BCardTitle:h["a"],BCardSubTitle:f["a"]},data:function(){return{apexChatData:v}}},w=y,j=a("2877"),D=Object(j["a"])(w,c,l,!1,null,null,null),k=D.exports,B=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{attrs:{"no-body":""}},[a("b-card-header",[a("div",[a("b-card-title",{staticClass:"mb-1"},[e._v(" Line Chart ")]),a("b-card-sub-title",[e._v("Commercial networks")])],1),a("div",{staticClass:"d-flex align-items-center"},[a("feather-icon",{attrs:{icon:"CalendarIcon",size:"16"}}),a("flat-pickr",{staticClass:"form-control flat-picker bg-transparent border-0 shadow-none",attrs:{config:{mode:"range"},placeholder:"YYYY-MM-DD"},model:{value:e.rangePicker,callback:function(t){e.rangePicker=t},expression:"rangePicker"}})],1)]),a("b-card-body",[a("vue-apex-charts",{attrs:{type:"area",height:"400",options:e.apexChatData.lineAreaChartSpline.chartOptions,series:e.apexChatData.lineAreaChartSpline.series}})],1)],1)},S=[],P=a("c38f"),_=a.n(P),A={components:{BCard:p["a"],VueApexCharts:g.a,BCardHeader:d["a"],BCardBody:u["a"],BCardTitle:h["a"],BCardSubTitle:f["a"],flatPickr:_.a},data:function(){return{apexChatData:v,rangePicker:["2019-05-01","2019-05-10"]}}},z=A,M=Object(j["a"])(z,B,S,!1,null,null,null),E=M.exports,R=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{attrs:{"no-body":""}},[a("b-card-header",[a("b-card-title",{staticClass:"mb-50"},[e._v(" Data Science ")]),a("div",{staticClass:"d-flex align-items-center"},[a("feather-icon",{attrs:{icon:"CalendarIcon",size:"16"}}),a("flat-pickr",{staticClass:"form-control flat-picker bg-transparent border-0 shadow-none",attrs:{config:{mode:"range"},placeholder:"YYYY-MM-DD"},model:{value:e.rangePicker,callback:function(t){e.rangePicker=t},expression:"rangePicker"}})],1)],1),a("b-card-body",[a("vue-apex-charts",{attrs:{type:"bar",height:"400",options:e.apexChatData.columnChart.chartOptions,series:e.apexChatData.columnChart.series}})],1)],1)},T=[],F={components:{BCard:p["a"],BCardBody:u["a"],BCardHeader:d["a"],VueApexCharts:g.a,flatPickr:_.a,BCardTitle:h["a"]},data:function(){return{apexChatData:v,rangePicker:["2019-05-01","2019-05-10"]}}},Y=F,I=Object(j["a"])(Y,R,T,!1,null,null,null),L=I.exports,V=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{attrs:{"no-body":""}},[a("b-card-header",[a("div",[a("b-card-sub-title",{staticClass:"mb-25"},[e._v(" Balance ")]),a("b-card-title",{staticClass:"font-weight-bolder"},[e._v(" $74,382.72 ")])],1),a("div",{staticClass:"d-flex align-items-center"},[a("feather-icon",{attrs:{icon:"CalendarIcon",size:"16"}}),a("flat-pickr",{staticClass:"form-control flat-picker bg-transparent border-0 shadow-none",attrs:{config:{mode:"range"},placeholder:"YYYY-MM-DD"},model:{value:e.rangePicker,callback:function(t){e.rangePicker=t},expression:"rangePicker"}})],1)]),a("b-card-body",[a("vue-apex-charts",{attrs:{type:"bar",height:"350",options:e.apexChatData.barChart.chartOptions,series:e.apexChatData.barChart.series}})],1)],1)},$=[],H={components:{VueApexCharts:g.a,BCard:p["a"],BCardHeader:d["a"],flatPickr:_.a,BCardBody:u["a"],BCardSubTitle:f["a"],BCardTitle:h["a"]},data:function(){return{apexChatData:v,rangePicker:["2019-05-01","2019-05-10"]}}},N=H,W=Object(j["a"])(N,V,$,!1,null,null,null),U=W.exports,J=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{attrs:{"no-body":""}},[a("b-card-header",[a("div",[a("b-card-title",{staticClass:"mb-50"},[e._v(" Stocks Prices ")]),a("b-card-text",{staticClass:"mb-0"},[e._v(" $50,863.98 ")])],1),a("div",{staticClass:"d-flex align-items-center"},[a("feather-icon",{attrs:{icon:"CalendarIcon",size:"16"}}),a("flat-pickr",{staticClass:"form-control flat-picker bg-transparent border-0 shadow-none",attrs:{config:{mode:"range"},placeholder:"YYYY-MM-DD"},model:{value:e.rangePicker,callback:function(t){e.rangePicker=t},expression:"rangePicker"}})],1)]),a("b-card-body",[a("vue-apex-charts",{attrs:{type:"candlestick",height:"400",options:e.apexChatData.candlestickChart.chartOptions,series:e.apexChatData.candlestickChart.series}})],1)],1)},G=[],q=a("d6e4"),K={components:{BCard:p["a"],VueApexCharts:g.a,BCardBody:u["a"],BCardHeader:d["a"],BCardTitle:h["a"],BCardText:q["a"],flatPickr:_.a},data:function(){return{apexChatData:v,rangePicker:["2019-05-01","2019-05-10"]}}},Q=K,X=Object(j["a"])(Q,J,G,!1,null,null,null),Z=X.exports,ee=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{attrs:{"no-body":""}},[a("b-card-header",[a("h4",{staticClass:"card-title mb-50"},[e._v(" New Technologies Data ")]),a("b-button-group",[a("b-button",{directives:[{name:"ripple",rawName:"v-ripple.400",value:"rgba(186, 191, 199, 0.15)",expression:"'rgba(186, 191, 199, 0.15)'",modifiers:{400:!0}}],attrs:{variant:"outline-primary"}},[e._v(" Daily ")]),a("b-button",{directives:[{name:"ripple",rawName:"v-ripple.400",value:"rgba(186, 191, 199, 0.15)",expression:"'rgba(186, 191, 199, 0.15)'",modifiers:{400:!0}}],attrs:{variant:"outline-primary"}},[e._v(" Monthly ")]),a("b-button",{directives:[{name:"ripple",rawName:"v-ripple.400",value:"rgba(186, 191, 199, 0.15)",expression:"'rgba(186, 191, 199, 0.15)'",modifiers:{400:!0}}],attrs:{variant:"outline-primary"}},[e._v(" Yearly ")])],1)],1),a("b-card-body",[a("vue-apex-charts",{attrs:{type:"scatter",height:"400",options:e.apexChatData.scatterChart.chartOptions,series:e.apexChatData.scatterChart.series}})],1)],1)},te=[],ae=a("1947"),re=a("12aa"),ne=a("e009"),oe={components:{BCard:p["a"],VueApexCharts:g.a,BCardHeader:d["a"],BCardBody:u["a"],BButton:ae["a"],BButtonGroup:re["a"]},directives:{Ripple:ne["a"]},data:function(){return{apexChatData:v}}},se=oe,ie=Object(j["a"])(se,ee,te,!1,null,null,null),ce=ie.exports,le=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{attrs:{"no-body":""}},[a("b-card-header",[a("b-card-title",[e._v("Daily Sales States")]),a("b-dropdown",{attrs:{variant:"link","toggle-class":"p-0","no-caret":""},scopedSlots:e._u([{key:"button-content",fn:function(){return[a("feather-icon",{staticClass:"text-body",attrs:{icon:"MoreVerticalIcon"}})]},proxy:!0}])},[a("b-dropdown-item",[e._v(" Last 28 Days ")]),a("b-dropdown-item",[e._v(" Last Month ")]),a("b-dropdown-item",[e._v(" Last Year ")])],1)],1),a("b-card-body",[a("vue-apex-charts",{attrs:{type:"heatmap",height:"350",options:e.apexChatData.heatMapChart.chartOptions,series:e.apexChatData.heatMapChart.series}})],1)],1)},de=[],pe=a("dd9a"),be=a("9eaa"),ue={components:{BCard:p["a"],BCardHeader:d["a"],BCardBody:u["a"],VueApexCharts:g.a,BCardTitle:h["a"],BDropdown:pe["a"],BDropdownItem:be["a"]},data:function(){return{apexChatData:v}}},he=ue,fe=Object(j["a"])(he,le,de,!1,null,null,null),me=fe.exports,ge=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",[a("b-card-title",{staticClass:"mb-1"},[e._v(" Expense Ratio ")]),a("b-card-sub-title",{staticClass:"mb-2"},[e._v(" Spending on various categories ")]),a("vue-apex-charts",{attrs:{type:"donut",height:"350",options:e.apexChatData.donutChart.chartOptions,series:e.apexChatData.donutChart.series}})],1)},xe=[],Ce={components:{VueApexCharts:g.a,BCard:p["a"],BCardTitle:h["a"],BCardSubTitle:f["a"]},data:function(){return{apexChatData:v}}},Oe=Ce,ve=Object(j["a"])(Oe,ge,xe,!1,null,null,null),ye=ve.exports,we=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{attrs:{"no-body":""}},[a("b-card-header",[a("b-card-title",{staticClass:"mb-sm-0 mb-1"},[e._v(" Statistics ")])],1),a("b-card-body",[a("vue-apex-charts",{attrs:{type:"radialBar",height:"400",options:e.apexChatData.radialBarChart.chartOptions,series:e.apexChatData.radialBarChart.series}})],1)],1)},je=[],De={components:{VueApexCharts:g.a,BCard:p["a"],BCardTitle:h["a"],BCardBody:u["a"],BCardHeader:d["a"]},data:function(){return{apexChatData:v}}},ke=De,Be=Object(j["a"])(ke,we,je,!1,null,null,null),Se=Be.exports,Pe=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-card",{attrs:{title:"Mobile Comparison"}},[a("vue-apex-charts",{attrs:{type:"radar",height:"400",options:e.apexChatData.radarChart.chartOptions,series:e.apexChatData.radarChart.series}})],1)},_e=[],Ae={components:{BCard:p["a"],VueApexCharts:g.a},data:function(){return{apexChatData:v}}},ze=Ae,Me=Object(j["a"])(ze,Pe,_e,!1,null,null,null),Ee=Me.exports,Re={components:{BRow:o["a"],BCol:s["a"],BLink:i["a"],ApexLineChart:k,ApexLineAreaChart:E,ApexDataBarChart:L,ApexBarChart:U,ApexCandlestickChart:Z,ApexScatterChart:ce,ApexHeatMapChart:me,ApexDonutChart:ye,ApexRadarChart:Ee,ApexRadialBarChart:Se}},Te=Re,Fe=(a("a28c"),Object(j["a"])(Te,r,n,!1,null,null,null));t["default"]=Fe.exports},e98b:function(e,t,a){"use strict";a.d(t,"a",(function(){return m}));var r=a("2b0e"),n=a("b42e"),o=a("c637"),s=a("a723"),i=a("d82f"),c=a("cf75"),l=a("4a38"),d=a("aa59");function p(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function b(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?p(Object(a),!0).forEach((function(t){u(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):p(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function u(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}var h=Object(i["j"])(d["b"],["event","routerTag"]);delete h.href.default,delete h.to.default;var f=Object(c["d"])(Object(i["m"])(b(b({},h),{},{pill:Object(c["c"])(s["g"],!1),tag:Object(c["c"])(s["u"],"span"),variant:Object(c["c"])(s["u"],"secondary")})),o["e"]),m=r["default"].extend({name:o["e"],functional:!0,props:f,render:function(e,t){var a=t.props,r=t.data,o=t.children,s=a.active,i=a.disabled,p=Object(l["d"])(a),b=p?d["a"]:a.tag,u=a.variant||"secondary";return e(b,Object(n["a"])(r,{staticClass:"badge",class:["badge-".concat(u),{"badge-pill":a.pill,active:s,disabled:i}],props:p?Object(c["e"])(h,a):{}}),o)}})}}]);
//# sourceMappingURL=chunk-c6610524.b927ceb8.js.map