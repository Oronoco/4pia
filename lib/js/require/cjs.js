define(function () {
	var commentRegExp = /(\/\*([\s\S]*?)\*\/|\/\/(.*)$)/mg,
		cjsRequireRegExp = /require[ ]*\(["']([^'"\s]+)["']\)/g;

    function getPath(dep, config) {
        var item = config.paths[dep] ? dep : null; 
        if (!item) item = 'cjs!' + dep;
        return item;
    }
	return {
		load: function (target, require, load, config) {
			// fetch the raw text
			require(['text!' + target + '.js'], function (source) {
				// start with the "standard" dependencies
				var deps = ['require', 'exports', 'module'],
					wrapped;
				// scan the source for other dependencies
				source = source.replace(commentRegExp, '').replace(cjsRequireRegExp, function (match, dep) {
                    var newDep = dep.replace(/.js$/, '');
					deps.push(getPath(newDep, config));
					return match.replace(dep, newDep);
				});
				wrapped = "define(['" + deps.join("','") + "'],function (req, exports, module) {" + 
                getPath.toString() +
                "function require(id) {" +
                    "return req(getPath(id, requirejs.s.contexts._.config));" +
                "}" + 
                source + 
                'return exports; });';
				// workaround IE conditional comments
				/*@if (@_jscript) @else @*/
				wrapped += '\n//@ sourceURL=' + require.toUrl(target);
				/*@end@*/

				// simulate injecting the wrapped source
				load.fromText('cjs!' + target, wrapped);

				// get the module we just defined and return it via load
				require(['cjs!' + target], load);
			});
		}
	};
});
