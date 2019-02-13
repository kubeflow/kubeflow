#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Unit tests for iam_patch.py
import unittest

import iam_patch


class Test(unittest.TestCase):

  def test_apply_iam_bindings_patch_add(self):
    current_policy = {}
    bindings_patch = {
        "bindings": [{
            "members": ['admin-sa'],
            "roles": ["roles/source.admin"]
        }]
    }
    expected = {'roles/source.admin': set(['admin-sa'])}
    result = iam_patch.apply_iam_bindings_patch(current_policy, bindings_patch,
                                                "add")
    self.assertEqual(result, expected)

  def test_apply_iam_bindings_patch_remove(self):
    current_policy = {'roles/source.admin': set(['admin-sa'])}
    bindings_patch = {
        "bindings": [{
            "members": ['admin-sa'],
            "roles": ["roles/source.admin"]
        }]
    }
    expected = {'roles/source.admin': set()}
    result = iam_patch.apply_iam_bindings_patch(current_policy, bindings_patch,
                                                "remove")
    self.assertEqual(result, expected)


if __name__ == '__main__':
  unittest.main()
