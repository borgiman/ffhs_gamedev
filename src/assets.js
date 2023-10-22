/*
    sprite sources, credit goes to Kenney.nl: https://opengameart.org/content/tower-defense-300-tilessprites
*/

class Assets {
    constructor() {
        this.assets = new Map();
        this.assets.set('tower', new Image());
        this.assets.get('tower').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAAHdbkFIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMDYwNDBCNjU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMDYwNDBCNzU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUwNjA0MEI0NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUwNjA0MEI1NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+vGALNwAABfNJREFUeNpi/P//PwM+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';
        this.assets.set('rocket', new Image());
        this.assets.get('rocket').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAAHdbkFIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMDYwNDBCQTU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMDYwNDBCQjU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUwNjA0MEI4NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUwNjA0MEI5NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QwsPDwAABORJREFUeNpi/P//PwM+wMRAAGAo2GCl9x+vAgthflQBkBuQ8d5rt/8j80l3w+G9u1D4jIS8CRBAjNQNB0ZGRjBGBizInPWWujD7GLEquBiVAaYDcAXUThv9/yBTkMVQFLRMmSKPromgNwECiKACkqOCqgZssNS7/8LX9v8GC918nIrQkxMybpg89T8oeYFoXGrwuoD75TMYfYAsL4Se3Q+mLY9sdxi8sQAQQIM8HQysAaCcvcFK9/x6S5149FxOtAu0+HgMJDk5FuBTw4JPko+VBYzJikaQs0H5AMR21lLFqY72sfD55QsGssJgnaWuPdfdGwyi926QGY3A8oQbqBlkyHoL3flkBSKoIAGxG3Kzcasb+pkJIIAo9sKA+2DUAZQCFrISDjCPrLXSlGf6z/IA1PA78fYjQ+Dxy4ywipouIQCzHNb6RGp90T4EQOCFrgnDa20tBP/qNQaG45fp54CXIAc4uyH4TFxAcv4IygX6y2YwMH3/BmbzXjkH5tPNAestdPYrc3MyCJw5Aubznz3CwMXMBK7D6OKAwBNXHO9+/c5wgwuSC3Z/+cXw7e+/D0HHLx8crQtGHUAqAAig0TQw6oBRB4w6gOw24SpjJX5WNu4P4MqJzPYgRSEAslyLj5tBgoMNb++PplEA6r8rANsFwL5oAl0dsM5CO16QlWXgEiEwDQQIsbHC+aLsrAzrzHX96ZYIX+iYCIgoKjAwcHOD+R9evWZ4+fqVAZC5kS4OeKlr+oBbTZ1BWg48TMtw/+J5hndvXz2gYxQwPPjz5w+cD2Iz/mOiowP+Mx74+P4dnP/xw3uGurysg3TPhgOWC0C+/XPzKpwPG12mX8fEUme9+4ndcL7Rwa1kZ0Myo4AxQBRYBMOADBcHAyPT/4YBSwOQIVVGgxHUHvj/v2H/X0QZdvTTd4b//1BnnmjaL0AeR4WCCw252YZkmTXaMRl1wKgDBtoBAAE24NlwxMfAaACMBsBoAIwGwGgADCBgoZdF6MtQIMNrXAuAMg7AtnxC0MnLGzGb/bSvounWDkAOgPWWuv1AqoCdiZFBgoOd4eG3HyDhD/8Y/xgEH7v+cFgHAMzzoAE1ZR4usNiff/8Zzn/4xPAX6BRgICjAAoEebqNrGbDOTFsf5HlmYFjAPA/Oh8CUoM4LGehj+se8YNgWgoxMjOB+uyQw2WMb2eBjYQYlFQdoQA3LWsAB5llsACYOC6hhVQuAwMVo0MJhRoZ/RiYMAoJCGPIP791leHT/LmTZ8YnsYZgFGBgPgOiP799jlYeNOINGn4drFgBPq/358xurJGLM/8+H4VkI/me8AKK/fv6MVf7rF4h4XV7exWEZALBJlC9fMAPgy+dPsObPAfpGCh0bQqDpTUZGpgXg6m7mahR59jvXGV63V4PZv399FQg7e+/jsGoIgdr+IM+D2GrARg9ofTNKFXj/JoMMJ6R9wMrKPWHYZQFWVq4CEA2a2ge1/LAB0DwTtLpIGH5lACMjOABE2SETa9xoS+RhKQK2AmC9uU7+cCsEwcn/2qcvDE8gvT8U8PfxA4ZrH78wvP8NqQr/MzA+GHaFIAhMzMv2f6+qtYGdg4NBXFIaLg9qAbICawfVNbPABeCwHg9onDjFn4EJc0qXnY1lQkV6+sdhOR4wWMHooOhoAIwGwGgAjAbASAYAXwwZOPJILtUAAAAASUVORK5CYII='
        this.assets.set('explosion_small', new Image());
        this.assets.get('explosion_small').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAAHdbkFIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMTIzNkM4ODU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMTIzNkM4OTU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUxMjM2Qzg2NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxMjM2Qzg3NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bE9fZAAABCNJREFUeNpi/P//PwM+wMRAAJCmgJGRkYEhnfE/mIYBkBtgGMzfz/AfWRxFwf/Z1uf/gwCEBosxUuwLgABipHM4MMy1XQ/GON0ADCQwPfM/PKRYUEzwoYUvAAKIoAkUBwPZBoCSDDjZNMn/h7NJdcH/iQb/GZ4+gtCkuuD/HJv9DFcvMDCkATlAGshfT1IggpwM1ASXZEw5glXtwMcCQAAN4nQwDAwAJ905NucZ5trcx5WMMTM8Orh/24BsF/yfYx3P8OYVAwiD2aSHAeMC7GxivXDrGiQjgcCqa2TGgjDQ5cbAlPr3LxkGqGkVMOy9CyqLGRg0dQtG8wJuABBAFIfBgPtg1AF0dwCslgYXcbNM+IEZbT+yGL6ij/ohwMz5geHUEQfk+pduUQC29NQRCAdIk+sIJrItP3scVRDIJ8cRJDvg/zxbe4avXyAltDwDpMgH0SA+UBwsT9MQ+Pf/ALjRpgZku0PFQLQapBEHlqdtFPxTYDCzAVZ4oGAH4pv2EBrEB4mD5EeL4lEHDCUHAATQaCIcdcCoA0YdMMQbpXNs+hnm2daT2yAl3Ecn7JoCyFgnQyP9G6Wzrc8z3AO2QoAYPLRF9zTAyGgAG4QAAge6OgDo+36G1y8RAkA2WIxuIQCK+/u3kcdzIGL0cMD/mcb85MhRLwSYOReAEx8IsEExCIDEQHJ0iIIAaMJjYEiAYhCAiAXQLxcY42CPHAeALf4PwRQA8opiRVUGhrXArHcZ2gu7DMTScvRpFaNPCKDI4ZgcGG2Wjzpg1AGjDhjUDgAIsAEviEZ8DIwGwGgAjAbAaACMBsBoAIwGwIABFlpbgGvMErKqB2lhzv9/AYypxzZiVUvDxtqApAC450Ezz6B5dxDNyLTh/2wr/2HXFEZPAeApddCs9s8fDAwXzyAk9E0YGNg5gFHC6MCYdPggvVIAXQPg/xwreaAPHzD8+QP0/GnUlWHMzMBAMAVmSlCu/KfAmHLs4bDKApCRW6YLYM6V85jL4kB8kDjEWReGXy0AGTkWAI8i//qJXQ1IHDLyLIBrBe+QDADoOs4AhvdvGeAj27gASB6kDqge3/rPIZYCoNXdw3uowm4MkHVHbmjK4eoYJwz5APg/16YezHjxFDXpRwKxApStAOUjZwWQelBWgOkfsing33/IpM37dwgxUMLmRVPHCxWHAZh6mP4hGwCg6VQQ+PYFwgctrGOHyunch0yvgGixfIg4bOHd54+o+odsAPz/D8nHqloQ/gOoOKc+sGYQgLDZgXmAE+pP6PQjg6omqv6h3BACVmnA6GWAeATU7H35DFLSo7cFRMSAWJyBgQ8+2VvAmHJk4vBpCYIaQ0wcDQyglQXYkvb//6AG0AGGfz8aGNPPfhwWTeHR8YDRABgNgNEAGA2A0QAYDYDRABisAAA1o7PiWNXQqwAAAABJRU5ErkJggg==';
        this.assets.set('explosion_big', new Image());
        this.assets.get('explosion_big').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAAHdbkFIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMTIzNkM4QzU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMTJDMUYyRjU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUxMjM2QzhBNTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxMjM2QzhCNTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+zlD/SQAABbFJREFUeNpi/P//PwM+wMRAAKAoYGRkZGCYa/sfTOM04dQRFC4LMud/o9x/Bu9HDP9VNUEOY8Q04ekjBgZjoNzt60i6gL6AYTB/js1/ZHFGQt4ECCBG6ocDchhgehPqQJgXMRTAAykZhwkMaZhuQFVwweYAmDYmwZsAAURQAUnBQFUDwOE5y4SfIZ3xP8M8W3308CVowP/ZVv4MZ89+AHNOHrkA5mNViJSaUHAakDqDhEF8LOpwh4G2AQPDWSj7GBDrmwzSWAAIoEGcDgbWAHjOnm9nD0yF9dhyOvbsiA7+/T8AZTWS7IX/M435wSUEEIPZJIfBf9YPcDYz5weSDPg/x3o+w7kTDAxuQI4lpKwCixHvAsYEMKUAxLpoYkQHIsh2Y2gqdQPGwAfSwqCAYReQPMsIwbugYsTmBVCc/59naw+Mxg0QaxgDGJMOH8SqduhnJoAAotgLA+6DUQfQ1QGwchFePgJbheCaG9o6RJGjdQgAW1vvGS6chnCuX0ZufdEuF8B8BrYMZPmvnwhJXmCRranLwJhyhBHW4qCJA8CWo7W3EeU+M7AAtQQ7giYOAMc5zHJhIA5GklsLxG+hbDMbYDv3MCPt0oAlmuUMUL4OvbLhZSgNqq9AWP89hP+ADokQWDXfB7IUGO7dYmD49BGSENnYGRj4gIlQSQ2U/B4wphxVpE0aGC2Kh6MDAAJoNA2MOmDUAaMOYCG1NYTWLAMXIrBWEPoYDI3bhFbyDH/+MIAwsIaMH4AoYHrAcBHYLrwBahwwLqCrA+CDBn//MjB8+4oIEbqFADPnA1BTHA5AjRMGpgt0cQDUpwIMnz8iBN+8ApEC5IQCE1lxf/Y4pjA4RJge0NQB/+fa1IPbgaC4RwegEAHlCJAamoXAf4YGSKqHgkggDkKSB40tgdTQwgHgvP7iKUIANI7OC8QiDKhj6u/fklQukBACjBMYHt1HdEzQAaxTAproAKmlQRQIwFm6WGStoDSkXBCghQM+gDsgMCCWj+gZceqj9pJxjutR5ID/BZCeDxCAeuU/kXLc3w8QMRBQ1YSopXarGN41B5UBoGwISmawAPkMxMvJ656zkJQNGRkMgBZcYHj9koFh3SsGeGkICnZFMQYGUXGIGlr0C5DbA+DC5j+DA5DpABU6ALT4AGPykUZS2wOjHZNRB4w6YMAdABCgfatZSSiIwudilJHRDaIfi4gW0SYwok1t8g3EJzCw2vYIvUEP0MY3qDeoRe6KWrgqqCQwWkQFhbUQm+/MXBonTQvNRueAf/c6g/PNzDlnvu/Y9m3Y9TPgAHAAOAAcAA6ANlpPKzptVDLV0uonKhVT3tbpc902TQ7bPe1CXpyu9sXgE0x0QOgC30Q03BVbQBXjJJhCANEi+Q6/vLd61vEASOrKS/GxljkUYeBbsBI8L1arUqkjAFB7focHf31ZeRMrASAIcH7K7/27s0B1PQEzK2b+8aGyPNg0lF32hdEi46Wz6612gn8CADu8YM8Hy/47m1+QjpHoyEsfx60FgKWMUPicSxzyV0T3hcY7AcE3jNKU8g2V3mJBiLQGADl4Dm3+lyKjRm1kVNWBcJ4wAxCsAICrwVG8ChkPSpopaIBdr0ZwQ3owxRfw0bFl+b5U9Gnz5LmZP7U1USDUn+FXODtz8Mkagyd1PWlcw8phEU7r14IwmOBnXcibICnkjNRb9up7Ee2aFAE/+7UyD1gyPkNSmdolmjuUjyHjbw8r+ooK2XUYEnbAswUnFswe3GFU3cWAB9cqW+BzYYfoTskLesCYnNb7tQAAcbLjCDA759P7u9wKOZKaJvb5RVyugKgYcMiX+tbtttjvedke/0fJqb7GBGrjk0EkSFmVCfLhRuT39PoiHaIeChHie7VG0NheDO+PXGAgguB/7m1kF63MBFU+kPmlAzsweQI78gCLzHGCDgAHgAPAAeAA6GL7AGDtazflfqDDAAAAAElFTkSuQmCC';
        this.assets.set('grass_tile', new Image());
        this.assets.get('grass_tile').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAFSDNYfAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpERjBEQ0IyNDU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpERjBEQ0IyNTU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRGMERDQjIyNTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRGMERDQjIzNTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+oPIxuQAACTpJREFUeNpMjVECgCAI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';
        this.assets.set('dirt_tile', new Image());
        this.assets.get('dirt_tile').src = 'data:image/png;base64,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';
    }

    getAsset(name) {
        return this.assets.get(name);
    }
}

const assets = new Assets();
export default assets;
