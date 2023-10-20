/*
    sprite sources, credit goes to Kenney.nl: https://opengameart.org/content/tower-defense-300-tilessprites
    game loop source: https://github.com/IceCreamYou/MainLoop.js
 */

const canvasElement = document.querySelector('canvas');
const fpsElement = document.getElementById('fps');
const context = canvasElement.getContext('2d');

const mathHelper = {
    getAngleBetweenPoints: (p1, p2) => Math.atan2(p1.y - p2.y, p1.x - p2.x),
    getDistanceBetweenPoints: (p1, p2) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
};

const assets = new Map();
assets.set('tower', new Image());
assets.get('tower').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAAHdbkFIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMDUyQUJGQTU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMDUyQUJGQjU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUwNTJBQkY4NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUwNTJBQkY5NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6m3sGwAABPBJREFUeNpi/P//PwNeAFKArGjt2rX/keWYGAgAggoYYcYrzQz5X/TbAS7Rx3qA4V76GkYWmACviRzDbIZ7cAW8DHLEWQFX8OnMwwV/P/8Es0H0JZN+RhAbIIAYiQoHGJg/f/5/EKZBOKCHAQj0sh64cD99jSE8HGZb3kPVeYbBgHgrGBkZGbT3Z/1n5GBh+P/7L8Ofd98YbgbMB8sBBBDhcCAAWFCsY2REkQSFGR8fH8OnT58YEhMTGbGFLxMDhYAFm2BRUdF/XGJ9fX2MWNMjLE2Ckh0h8PnMI3BapYoXUAwAZj94ksWaMP/9Z/j55APD/Yy1jFi9QA4ACCCKDaBuNCInJFC0WVtbM/z8+ZPhzJkzKNGH7GrqxsLQNICFmHwAEweCC/39/YY4DVCcEfyf4RaQVlQE8589ewYRh/Lv379vAFYDjDCsBoAy0h4TkPw97O61ZGDg/i5JWRgwcbIO5mgEFRT/fvzBqRiU1UFqcOZGUF4AhTKXujiYz8zLDtcIAt9uvgSXBSh6KM3OAAFEsQE0KdWx1THEpHZsKR1XXU/QAYSArq4uA6jSAwFQmQXCly9fNqB7MhzwfDDqAEoBzmyIXkHCimRSALD4xlmZEnQAqJ0EKpFgpRG54N/33wz///wDl2Kw9hTR2ZBSy7FVH6OJkCQHgOKOGuDXy8+glu8DknOBwoyg+YwMjAmw6hHUFGHiZsNbT/z79Yfh/8+/YPafj98Zfr34BG9Ok5QLkC2BOYTkbIjUjifZAfQCAAE04A4YzYYspLaGCgsLzwPlsTY80PvAhBIgWS0ikOWg1hA7OzsYgwdkPn0CtYZG08CoA0YdMOqAYVQUE1v0Euq04iuaiXYAyHL0PsGXL1/AGGWIB00NqE9AdggozAg+D3Q6xNe3yA9e6JgS3C/E14ZAy0HtQEYWJvzjTviAJWSeATS8AuqUkJwIQZYT6lQQAwh1bpjI7dGMlgOjDhjeDgB1JEEdSmoAQh1crA54kLFO8efj9+B5GlBBApqzIXlk5McfsN4vF56A54RI6prB+gWgopRNgo+BhZ8TIs7OzMDEhrv6AJn17+svUBCCAagEBFkO9FAizk4wPgdgcwSkeGNkYOZiQ/j291+G/2jD5MiW4+uYEHQAlkqFuLhHspxkB4yobAgQoH0zOG4QBqKoBLbPLsGduAXSgUsgHbgDfE4VLiGugVsutOCDcwgzIO9CFisaEwlHQplkd4YRPgikx0p87y7RCfz7jfDXa2LXsIVFV2+hbw6nmWOXI3jmoSiK00Ob/wSvXsyyzqR8xRbDKmh6aIWMkk5oZVlm0Ccbk9G8BBgAA2AADIABMAAGwADmlsIepa6TjdVI/VQqewdAUtdW2kIhbTO0bZrtOlVVeZPKkwBsXp62ok1yaT7ptzjua0ZK4MdRJO0BTp09Y1I8AGuJsB1KOIS/KPojRjVJZJQGuFef5H0JxJz4sIN/3t8EEXwP8FHQFQIEvwYZAANgAAyAAQQEoKTaY4vfg3Spw8tHnxiLkFzpMoFw7+a97sZC36jQGIMoQcoL6LW09zKHyTIVEg6vE4bJtih2NMFDxcG9DLZnIr0BGP4bfAfCUI1yBVBSN4dTTStU3Yyqu7GJ694xC4CpIL5ca3XzEny6eAjLUGwTjwZAA1FAswMY6yDrXqgzNDjxZ9v+EAQAvwb/oF0BDceIWQal6AoAAAAASUVORK5CYII=';
assets.set('rocket', new Image());
assets.get('rocket').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAAHdbkFIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMDYwNDBCQTU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMDYwNDBCQjU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUwNjA0MEI4NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUwNjA0MEI5NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+QwsPDwAABORJREFUeNpi/P//PwM+wMRAAGAo2GCl9x+vAgthflQBkBuQ8d5rt/8j80l3w+G9u1D4jIS8CRBAjNQNB0ZGRjBGBizInPWWujD7GLEquBiVAaYDcAXUThv9/yBTkMVQFLRMmSKPromgNwECiKACkqOCqgZssNS7/8LX9v8GC918nIrQkxMybpg89T8oeYFoXGrwuoD75TMYfYAsL4Se3Q+mLY9sdxi8sQAQQIM8HQysAaCcvcFK9/x6S5149FxOtAu0+HgMJDk5FuBTw4JPko+VBYzJikaQs0H5AMR21lLFqY72sfD55QsGssJgnaWuPdfdGwyi926QGY3A8oQbqBlkyHoL3flkBSKoIAGxG3Kzcasb+pkJIIAo9sKA+2DUAZQCFrISDjCPrLXSlGf6z/IA1PA78fYjQ+Dxy4ywipouIQCzHNb6RGp90T4EQOCFrgnDa20tBP/qNQaG45fp54CXIAc4uyH4TFxAcv4IygX6y2YwMH3/BmbzXjkH5tPNAestdPYrc3MyCJw5Aubznz3CwMXMBK7D6OKAwBNXHO9+/c5wgwuSC3Z/+cXw7e+/D0HHLx8crQtGHUAqAAig0TQw6oBRB4w6gOw24SpjJX5WNu4P4MqJzPYgRSEAslyLj5tBgoMNb++PplEA6r8rANsFwL5oAl0dsM5CO16QlWXgEiEwDQQIsbHC+aLsrAzrzHX96ZYIX+iYCIgoKjAwcHOD+R9evWZ4+fqVAZC5kS4OeKlr+oBbTZ1BWg48TMtw/+J5hndvXz2gYxQwPPjz5w+cD2Iz/mOiowP+Mx74+P4dnP/xw3uGurysg3TPhgOWC0C+/XPzKpwPG12mX8fEUme9+4ndcL7Rwa1kZ0Myo4AxQBRYBMOADBcHAyPT/4YBSwOQIVVGgxHUHvj/v2H/X0QZdvTTd4b//1BnnmjaL0AeR4WCCw252YZkmTXaMRl1wKgDBtoBAAE24NlwxMfAaACMBsBoAIwGwGgADCBgoZdF6MtQIMNrXAuAMg7AtnxC0MnLGzGb/bSvounWDkAOgPWWuv1AqoCdiZFBgoOd4eG3HyDhD/8Y/xgEH7v+cFgHAMzzoAE1ZR4usNiff/8Zzn/4xPAX6BRgICjAAoEebqNrGbDOTFsf5HlmYFjAPA/Oh8CUoM4LGehj+se8YNgWgoxMjOB+uyQw2WMb2eBjYQYlFQdoQA3LWsAB5llsACYOC6hhVQuAwMVo0MJhRoZ/RiYMAoJCGPIP791leHT/LmTZ8YnsYZgFGBgPgOiP799jlYeNOINGn4drFgBPq/358xurJGLM/8+H4VkI/me8AKK/fv6MVf7rF4h4XV7exWEZALBJlC9fMAPgy+dPsObPAfpGCh0bQqDpTUZGpgXg6m7mahR59jvXGV63V4PZv399FQg7e+/jsGoIgdr+IM+D2GrARg9ofTNKFXj/JoMMJ6R9wMrKPWHYZQFWVq4CEA2a2ge1/LAB0DwTtLpIGH5lACMjOABE2SETa9xoS+RhKQK2AmC9uU7+cCsEwcn/2qcvDE8gvT8U8PfxA4ZrH78wvP8NqQr/MzA+GHaFIAhMzMv2f6+qtYGdg4NBXFIaLg9qAbICawfVNbPABeCwHg9onDjFn4EJc0qXnY1lQkV6+sdhOR4wWMHooOhoAIwGwGgAjAbASAYAXwwZOPJILtUAAAAASUVORK5CYII='
assets.set('explosion_small', new Image());
assets.get('explosion_small').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAAHdbkFIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMTIzNkM4ODU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMTIzNkM4OTU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUxMjM2Qzg2NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxMjM2Qzg3NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+bE9fZAAABCNJREFUeNpi/P//PwM+wMRAAJCmgJGRkYEhnfE/mIYBkBtgGMzfz/AfWRxFwf/Z1uf/gwCEBosxUuwLgABipHM4MMy1XQ/GON0ADCQwPfM/PKRYUEzwoYUvAAKIoAkUBwPZBoCSDDjZNMn/h7NJdcH/iQb/GZ4+gtCkuuD/HJv9DFcvMDCkATlAGshfT1IggpwM1ASXZEw5glXtwMcCQAAN4nQwDAwAJ905NucZ5trcx5WMMTM8Orh/24BsF/yfYx3P8OYVAwiD2aSHAeMC7GxivXDrGiQjgcCqa2TGgjDQ5cbAlPr3LxkGqGkVMOy9CyqLGRg0dQtG8wJuABBAFIfBgPtg1AF0dwCslgYXcbNM+IEZbT+yGL6ij/ohwMz5geHUEQfk+pduUQC29NQRCAdIk+sIJrItP3scVRDIJ8cRJDvg/zxbe4avXyAltDwDpMgH0SA+UBwsT9MQ+Pf/ALjRpgZku0PFQLQapBEHlqdtFPxTYDCzAVZ4oGAH4pv2EBrEB4mD5EeL4lEHDCUHAATQaCIcdcCoA0YdMMQbpXNs+hnm2daT2yAl3Ecn7JoCyFgnQyP9G6Wzrc8z3AO2QoAYPLRF9zTAyGgAG4QAAge6OgDo+36G1y8RAkA2WIxuIQCK+/u3kcdzIGL0cMD/mcb85MhRLwSYOReAEx8IsEExCIDEQHJ0iIIAaMJjYEiAYhCAiAXQLxcY42CPHAeALf4PwRQA8opiRVUGhrXArHcZ2gu7DMTScvRpFaNPCKDI4ZgcGG2Wjzpg1AGjDhjUDgAIsAEviEZ8DIwGwGgAjAbAaACMBsBoAIwGwIABFlpbgGvMErKqB2lhzv9/AYypxzZiVUvDxtqApAC450Ezz6B5dxDNyLTh/2wr/2HXFEZPAeApddCs9s8fDAwXzyAk9E0YGNg5gFHC6MCYdPggvVIAXQPg/xwreaAPHzD8+QP0/GnUlWHMzMBAMAVmSlCu/KfAmHLs4bDKApCRW6YLYM6V85jL4kB8kDjEWReGXy0AGTkWAI8i//qJXQ1IHDLyLIBrBe+QDADoOs4AhvdvGeAj27gASB6kDqge3/rPIZYCoNXdw3uowm4MkHVHbmjK4eoYJwz5APg/16YezHjxFDXpRwKxApStAOUjZwWQelBWgOkfsing33/IpM37dwgxUMLmRVPHCxWHAZh6mP4hGwCg6VQQ+PYFwgctrGOHyunch0yvgGixfIg4bOHd54+o+odsAPz/D8nHqloQ/gOoOKc+sGYQgLDZgXmAE+pP6PQjg6omqv6h3BACVmnA6GWAeATU7H35DFLSo7cFRMSAWJyBgQ8+2VvAmHJk4vBpCYIaQ0wcDQyglQXYkvb//6AG0AGGfz8aGNPPfhwWTeHR8YDRABgNgNEAGA2A0QAYDYDRABisAAA1o7PiWNXQqwAAAABJRU5ErkJggg==';
assets.set('explosion_big', new Image());
assets.get('explosion_big').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAAHdbkFIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMTIzNkM4QzU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMTJDMUYyRjU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUxMjM2QzhBNTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUxMjM2QzhCNTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+zlD/SQAABbFJREFUeNpi/P//PwM+wMRAAKAoYGRkZGCYa/sfTOM04dQRFC4LMud/o9x/Bu9HDP9VNUEOY8Q04ekjBgZjoNzt60i6gL6AYTB/js1/ZHFGQt4ECCBG6ocDchhgehPqQJgXMRTAAykZhwkMaZhuQFVwweYAmDYmwZsAAURQAUnBQFUDwOE5y4SfIZ3xP8M8W3308CVowP/ZVv4MZ89+AHNOHrkA5mNViJSaUHAakDqDhEF8LOpwh4G2AQPDWSj7GBDrmwzSWAAIoEGcDgbWAHjOnm9nD0yF9dhyOvbsiA7+/T8AZTWS7IX/M435wSUEEIPZJIfBf9YPcDYz5weSDPg/x3o+w7kTDAxuQI4lpKwCixHvAsYEMKUAxLpoYkQHIsh2Y2gqdQPGwAfSwqCAYReQPMsIwbugYsTmBVCc/59naw+Mxg0QaxgDGJMOH8SqduhnJoAAotgLA+6DUQfQ1QGwchFePgJbheCaG9o6RJGjdQgAW1vvGS6chnCuX0ZufdEuF8B8BrYMZPmvnwhJXmCRranLwJhyhBHW4qCJA8CWo7W3EeU+M7AAtQQ7giYOAMc5zHJhIA5GklsLxG+hbDMbYDv3MCPt0oAlmuUMUL4OvbLhZSgNqq9AWP89hP+ADokQWDXfB7IUGO7dYmD49BGSENnYGRj4gIlQSQ2U/B4wphxVpE0aGC2Kh6MDAAJoNA2MOmDUAaMOYCG1NYTWLAMXIrBWEPoYDI3bhFbyDH/+MIAwsIaMH4AoYHrAcBHYLrwBahwwLqCrA+CDBn//MjB8+4oIEbqFADPnA1BTHA5AjRMGpgt0cQDUpwIMnz8iBN+8ApEC5IQCE1lxf/Y4pjA4RJge0NQB/+fa1IPbgaC4RwegEAHlCJAamoXAf4YGSKqHgkggDkKSB40tgdTQwgHgvP7iKUIANI7OC8QiDKhj6u/fklQukBACjBMYHt1HdEzQAaxTAproAKmlQRQIwFm6WGStoDSkXBCghQM+gDsgMCCWj+gZceqj9pJxjutR5ID/BZCeDxCAeuU/kXLc3w8QMRBQ1YSopXarGN41B5UBoGwISmawAPkMxMvJ656zkJQNGRkMgBZcYHj9koFh3SsGeGkICnZFMQYGUXGIGlr0C5DbA+DC5j+DA5DpABU6ALT4AGPykUZS2wOjHZNRB4w6YMAdABCgfatZSSiIwudilJHRDaIfi4gW0SYwok1t8g3EJzCw2vYIvUEP0MY3qDeoRe6KWrgqqCQwWkQFhbUQm+/MXBonTQvNRueAf/c6g/PNzDlnvu/Y9m3Y9TPgAHAAOAAcAA6ANlpPKzptVDLV0uonKhVT3tbpc902TQ7bPe1CXpyu9sXgE0x0QOgC30Q03BVbQBXjJJhCANEi+Q6/vLd61vEASOrKS/GxljkUYeBbsBI8L1arUqkjAFB7focHf31ZeRMrASAIcH7K7/27s0B1PQEzK2b+8aGyPNg0lF32hdEi46Wz6612gn8CADu8YM8Hy/47m1+QjpHoyEsfx60FgKWMUPicSxzyV0T3hcY7AcE3jNKU8g2V3mJBiLQGADl4Dm3+lyKjRm1kVNWBcJ4wAxCsAICrwVG8ChkPSpopaIBdr0ZwQ3owxRfw0bFl+b5U9Gnz5LmZP7U1USDUn+FXODtz8Mkagyd1PWlcw8phEU7r14IwmOBnXcibICnkjNRb9up7Ee2aFAE/+7UyD1gyPkNSmdolmjuUjyHjbw8r+ooK2XUYEnbAswUnFswe3GFU3cWAB9cqW+BzYYfoTskLesCYnNb7tQAAcbLjCDA759P7u9wKOZKaJvb5RVyugKgYcMiX+tbtttjvedke/0fJqb7GBGrjk0EkSFmVCfLhRuT39PoiHaIeChHie7VG0NheDO+PXGAgguB/7m1kF63MBFU+kPmlAzsweQI78gCLzHGCDgAHgAPAAeAA6GL7AGDtazflfqDDAAAAAElFTkSuQmCC';

let entities = [];
const zLayers = {
    environment: 0,
    entity: 1,
    missile: 2,
    effects: 3
};
let mousePosition = {
    x: -1,
    y: -1
};

canvasElement.addEventListener('mouseup', function(mouseEvent) {
    const canvasRect = canvasElement.getBoundingClientRect();
    const mouseX = mouseEvent.clientX - canvasRect.left;
    const mouseY = mouseEvent.clientY - canvasRect.top;
    const tower = new Tower(mouseX, mouseY);
    entities.push(tower);
});

canvasElement.addEventListener('mousemove', function(mouseEvent) {
    const canvasRect = canvasElement.getBoundingClientRect();
    const mouseX = mouseEvent.clientX - canvasRect.left;
    const mouseY = mouseEvent.clientY - canvasRect.top;
    mousePosition = {
        x: mouseX,
        y: mouseY
    };
});

MainLoop.setUpdate(update).setDraw(draw).setEnd(end).start();

function update(delta) {
    entities.forEach(x => x.update(delta));
}

function draw(interpolationPercentage) {
    context.clearRect(0, 0, canvasElement.width, canvasElement.height);
    entities.sort(x => x.zLayer).forEach(x => x.draw(interpolationPercentage));
}

function end(fps, panic) {
    fpsElement.textContent = Math.round(fps) + ' FPS';

    if (panic) {
        const discardedTime = Math.round(MainLoop.resetFrameDelta());
        console.warn(`'Main loop panicked, probably because the browser tab was put in the background. Discarding ${discardedTime} ms`);
    }
}

class Tower {
    constructor(x, y) {
        this.sprite = assets.get('tower');
        this.zLayer = zLayers.entity;
        this.x = x;
        this.y = y;
        this.watchPath = new Path2D();
        this.watchPath.arc(this.x, this.y, 100, 0, 2 * Math.PI);
        this.timeLastRocketWasShot = new Date(Date.now());
        this.lastKnownEnemyPosition = { x: this.x, y: this.y };
    }

    update(delta) {
        let enemyInsideWatchPath = false;

        if (context.isPointInPath(this.watchPath, mousePosition.x, mousePosition.y)) {
            this.lastKnownEnemyPosition = mousePosition;
            enemyInsideWatchPath = true;
        }

        const minTimeBetweenRockets = 2000;
        const shootRocket = enemyInsideWatchPath && this.timeLastRocketWasShot < new Date(Date.now() - minTimeBetweenRockets);
        if (shootRocket) {
            this.timeLastRocketWasShot = new Date(Date.now());
            const enemy = new Enemy(mousePosition.x, mousePosition.y);
            entities.push(enemy);
            const rocket = new Rocket(this.x, this.y, enemy);
            entities.push(rocket);
        }
    }

    draw(interpolationPercentage) {
        const lookAtEnemyAngle = mathHelper.getAngleBetweenPoints(this, this.lastKnownEnemyPosition) - Math.PI / 2;

        context.save();
        context.stroke(this.watchPath);
        context.translate(this.x, this.y);
        context.rotate(lookAtEnemyAngle);
        context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        context.restore();
    }
}

class Rocket {
    constructor(x, y, targetEnemy) {
        this.sprite = assets.get('rocket');
        this.zLayer = zLayers.missile;
        this.x = x;
        this.y = y;
        this.targetEnemy = targetEnemy;
    }

    update(delta) {
        const speed = 0.15;
        const xDiff = this.x - this.targetEnemy.x;
        const yDiff = this.y - this.targetEnemy.y;
        const xDiffAbsolute = Math.abs(xDiff);
        const yDiffAbsolute = Math.abs(yDiff);
        const xFactor= xDiffAbsolute > yDiffAbsolute ? 1 : xDiffAbsolute / yDiffAbsolute;
        const yFactor = xDiffAbsolute > yDiffAbsolute ? yDiffAbsolute / xDiffAbsolute : 1;
        const deltaX = xFactor * speed * delta;
        const deltaY = yFactor * speed * delta;
        this.x = xDiff > 0 ? this.x - deltaX : this.x + deltaX;
        this.y = yDiff > 0 ? this.y - deltaY : this.y + deltaY;

        const distanceToEnemy = mathHelper.getDistanceBetweenPoints(this, this.targetEnemy);
        if (distanceToEnemy < 3) {
            entities.splice(entities.indexOf(this), 1);
            entities.push(new Explosion(this.x, this.y));
        }
    }

    draw(interpolationPercentage) {
        const lookAtEnemyAngle = mathHelper.getAngleBetweenPoints(this, this.targetEnemy) - Math.PI / 2;

        context.save();
        context.translate(this.x, this.y);
        context.rotate(lookAtEnemyAngle);
        context.drawImage(this.sprite, -this.sprite.width / 2, -this.sprite.height / 2);
        context.restore();
    }
}

class Enemy {
    constructor(x, y) {
        this.zLayer = zLayers.entity;
        this.x = x;
        this.y = y;
    }

    update(delta) {
        this.x = mousePosition.x;
        this.y = mousePosition.y;
    }

    draw(interpolationPercentage) {
    }
}

class Explosion {
    constructor(x, y) {
        this.sprite_small = assets.get('explosion_small');
        this.sprite_big = assets.get('explosion_big');
        this.sprite = this.sprite_small;
        this.zLayer = zLayers.effect;
        this.x = x;
        this.y = y;
        this.deathDate = new Date(Date.now() + 500);
    }

    update(delta) {
        this.sprite = this.sprite == this.sprite_small ? this.sprite_big : this.sprite_small;

        if (new Date(Date.now()) > this.deathDate) {
            entities.splice(entities.indexOf(this), 1);
        }
    }

    draw(interpolationPercentage) {
        context.drawImage(this.sprite, this.x - this.sprite.width / 2, this.y - this.sprite.height / 2);
    }
}
