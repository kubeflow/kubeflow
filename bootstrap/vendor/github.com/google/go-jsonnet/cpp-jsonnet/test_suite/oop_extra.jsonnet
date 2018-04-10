/*
Copyright 2015 Google Inc. All rights reserved.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

// Simple super
std.assertEqual(({ x: 0, y: self.x } + { x: 1, y: super.y }).y, 1) &&

// returning self
std.assertEqual(({ x: 0, y: self.x } + { x: 1, z: self }).z.y, 1) &&

// extending self on the right
std.assertEqual(({ x: 0, y: self.x } + { x: 1, z: (self + {}).y }).z, 1) &&
std.assertEqual(({ x: 0, y: self.x } + { x: 1, z: (self + {}) }).z.y, 1) &&

// extending self on the right has dynamic binding
std.assertEqual(({ x: 0, y: self.x } + { x: 2, z: (self + { x: 1 }).y }).z, 1) &&
std.assertEqual(({ x: 0, y: self.x } + { x: 2, z: (self + { x: 1 }) }).z.y, 1) &&

std.assertEqual(({ x: 0, y: self.x } + { x: 2, w: 1, z: (self + { x: super.w }).y }).z, 1) &&
std.assertEqual(({ x: 0, y: self.x } + { x: 2, w: 1, z: (self + { x: super.w }) }).z.y, 1) &&
std.assertEqual(({ x: 0, y: self.x } + { x: 2, w: 1, z: (self + { x: self.w }).y }).z, 1) &&
std.assertEqual(({ x: 0, y: self.x } + { x: 2, w: 1, z: (self + { x: self.w }) }).z.y, 1) &&

// self + self
std.assertEqual(({ x: 1, y: super.x } + { z: (self + self).y }).z, 1) &&

// extending self on the left
std.assertEqual(({ x: 0, y: self.x } + { x: 1, z: ({} + self).y }).z, 1) &&
std.assertEqual(({ x: 0, y: self.x } + { x: 1, z: ({} + self) }).z.y, 1) &&

std.assertEqual(({ x: 1, z: ({ x: 0, y: self.x } + self).y }).z, 1) &&
std.assertEqual(({ x: 1, z: ({ x: 0, y: self.x } + self) }).z.y, 1) &&

std.assertEqual(({ x: 0, z: ({ w: 1, x: 2, y: self.w } + self).y }).z, 1) &&
std.assertEqual(({ x: 0, z: ({ w: 1, x: 2, y: self.w } + self) }).z.y, 1) &&

std.assertEqual(({ x: 1, w: self.x, z: ({ x: 2, y: self.w } + self).y }).z, 1) &&
std.assertEqual(({ x: 1, w: self.x, z: ({ x: 2, y: self.w } + self) }).z.y, 1) &&


// extra

std.assertEqual({ a: ({ b: self.c, c: 1 } + self).b }.a, 1) &&

true
