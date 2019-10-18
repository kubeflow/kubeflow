package utils

import (
	"testing"
)

func Test_IsRemoteFile(t *testing.T) {
	type testCase struct {
		filePath string
		isRemote bool
	}

	testCases := []testCase{
		{
			filePath: "http://github.com",
			isRemote: true,
		},
		{
			filePath: "../abc.txt",
			isRemote: false,
		},
		{
			filePath: "/ab/c.txt",
			isRemote: false,
		},
		{
			filePath: "abc.txt",
			isRemote: false,
		},
	}

	for _, test := range testCases {
		isRemote, err := IsRemoteFile(test.filePath)
		if err != nil {
			t.Errorf("Error checking IsRemoteFile: %v", err)
		}
		if isRemote != test.isRemote {
			t.Errorf("check if path %v is remote; expect %v, got %v", test.filePath, test.isRemote, isRemote)
		}
	}
}
