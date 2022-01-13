var InMemoryStorage = /** @class */ (function () {
    function InMemoryStorage(store) {
        if (store === void 0) { store = {}; }
        this.store = store;
    }
    InMemoryStorage.prototype.getItem = function (key) {
        if (key in this.store) {
            return this.store[key];
        }
        return null;
    };
    InMemoryStorage.prototype.removeItem = function (key) {
        delete this.store[key];
    };
    InMemoryStorage.prototype.setItem = function (key, value) {
        this.store[key] = value;
    };
    return InMemoryStorage;
}());
export { InMemoryStorage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5NZW1vcnlTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0luTWVtb3J5U3RvcmFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtJQUNFLHlCQUFvQixLQUFxQztRQUFyQyxzQkFBQSxFQUFBLFVBQXFDO1FBQXJDLFVBQUssR0FBTCxLQUFLLENBQWdDO0lBQUcsQ0FBQztJQUU3RCxpQ0FBTyxHQUFQLFVBQVEsR0FBVztRQUNqQixJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN4QjtRQUVELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELG9DQUFVLEdBQVYsVUFBVyxHQUFXO1FBQ3BCLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN6QixDQUFDO0lBRUQsaUNBQU8sR0FBUCxVQUFRLEdBQVcsRUFBRSxLQUFhO1FBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQzFCLENBQUM7SUFDSCxzQkFBQztBQUFELENBQUMsQUFsQkQsSUFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdG9yYWdlIH0gZnJvbSBcIi4vU3RvcmFnZVwiO1xuXG5leHBvcnQgY2xhc3MgSW5NZW1vcnlTdG9yYWdlIGltcGxlbWVudHMgU3RvcmFnZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc3RvcmU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSB7fSkge31cblxuICBnZXRJdGVtKGtleTogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKGtleSBpbiB0aGlzLnN0b3JlKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdG9yZVtrZXldO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmVtb3ZlSXRlbShrZXk6IHN0cmluZyk6IHZvaWQge1xuICAgIGRlbGV0ZSB0aGlzLnN0b3JlW2tleV07XG4gIH1cblxuICBzZXRJdGVtKGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9yZVtrZXldID0gdmFsdWU7XG4gIH1cbn1cbiJdfQ==