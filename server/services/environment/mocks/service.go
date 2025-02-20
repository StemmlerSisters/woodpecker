// Code generated by mockery. DO NOT EDIT.

package mocks

import (
	mock "github.com/stretchr/testify/mock"
	model "go.woodpecker-ci.org/woodpecker/v3/server/model"
)

// Service is an autogenerated mock type for the Service type
type Service struct {
	mock.Mock
}

// EnvironList provides a mock function with given fields: _a0
func (_m *Service) EnvironList(_a0 *model.Repo) ([]*model.Environ, error) {
	ret := _m.Called(_a0)

	if len(ret) == 0 {
		panic("no return value specified for EnvironList")
	}

	var r0 []*model.Environ
	var r1 error
	if rf, ok := ret.Get(0).(func(*model.Repo) ([]*model.Environ, error)); ok {
		return rf(_a0)
	}
	if rf, ok := ret.Get(0).(func(*model.Repo) []*model.Environ); ok {
		r0 = rf(_a0)
	} else {
		if ret.Get(0) != nil {
			r0 = ret.Get(0).([]*model.Environ)
		}
	}

	if rf, ok := ret.Get(1).(func(*model.Repo) error); ok {
		r1 = rf(_a0)
	} else {
		r1 = ret.Error(1)
	}

	return r0, r1
}

// NewService creates a new instance of Service. It also registers a testing interface on the mock and a cleanup function to assert the mocks expectations.
// The first argument is typically a *testing.T value.
func NewService(t interface {
	mock.TestingT
	Cleanup(func())
}) *Service {
	mock := &Service{}
	mock.Mock.Test(t)

	t.Cleanup(func() { mock.AssertExpectations(t) })

	return mock
}
