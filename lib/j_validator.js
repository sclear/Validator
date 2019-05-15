(function (global, factory) {
    (typeof exports === 'object' && typeof module !== 'undefined') ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.j_validator = factory())
}(this, function () {
    return class j_validator {
        constructor(rules) {
            this.rules = rules;
        }
        static VOID_TYPE(value) {
            return Object.prototype.toString.call(value).replace(/[\[\]]/g, '').split(' ')[1]
        }
        async valid(data) {
            let ary = [];
            let d_key = Object.keys(data);
            d_key.forEach(key => {
                let err = this.differ(key, data[key], this.rules[key]);
                if (err) ary.push(err);
            });
            return ary
        }
        differ(key, val, rule) {
            if (j_validator.VOID_TYPE(rule) === 'Array') {
                for (let _r of rule) {
                    let err = this.dispatch(key, val, _r);
                    if (err) return err
                }
            }
            else {
                let err = this.dispatch(key, val, rule)
                if (err) return err
            }
        }
        dispatch(key, val, rule) {
            for (let t_key in rule) {
                let err = this.commit(t_key, rule[t_key], key, val, rule.message);
                if (err) return err
            }
        }
        commit(type, t_val, key, val, message) {
            let err = { err_key: key, err_messge: message };
            let errMsg = '';
            function cb(er) {
                if (!er) return
                errMsg = er.message;
                err.err_messge = er.message;
            }
            switch (type) {
                case 'required':
                    if (Boolean(val) !== t_val) return err; break;
                case 'max':
                    if (val.length > t_val) return err; break;
                case 'min':
                    if (val.length < t_val) return err; break;
                case 'type':
                    if (j_validator.VOID_TYPE(val) !== t_val)
                        return err; break;
                case 'reg':
                    if (!t_val.test(val)) return err; break;
                case 'validator':
                    t_val(this.rules, val, cb)
                    if (errMsg) return err; break;
                case 'enum': if (!t_val.includes(val)) return err; break;
                case 'same': if (t_val !== val) return err; break;
            }
        }
    }
}))





