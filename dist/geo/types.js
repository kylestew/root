export function toVec2(value) {
    if (typeof value === 'number') {
        // If the value is a single number, create a Vec2 where both components are the same
        return [value, value];
    }
    else if (value.length === 2) {
        // If the value is already a Vec2, return it as-is
        return value;
    }
    else if (value.length === 3) {
        // If the value is a Vec3, return the first two components as a Vec2
        return [value[0], value[1]];
    }
    else {
        throw new Error('Invalid input type for toVec2 function');
    }
}
export function toVec3(value) {
    if (typeof value === 'number') {
        // If the value is a single number, create a Vec3 where all three components are the same
        return [value, value, value];
    }
    else if (value.length === 2) {
        // If the value is a Vec2, add a third component with a value of 0
        return [value[0], value[1], 0];
    }
    else if (value.length === 3) {
        // If the value is already a Vec3, return it as-is
        return value;
    }
    else {
        throw new Error('Invalid input type for toVec3 function');
    }
}
//# sourceMappingURL=types.js.map