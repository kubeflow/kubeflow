/*
Copyright 2016 Google Inc. All rights reserved.

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

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class BaseTemplate extends JsonnetObject {
    public Set<String> nonHiddenFields() {
        Set<String> r = super.nonHiddenFields();
        r.addAll(Arrays.asList("apiVersion", "kind", "spec"));
        return r;
    }

    // Mandatory param
    public Object accessToken() {
        throw new RuntimeException("accessToken must be defined");
    }

    // Optional params
    public Object image() { return "gcr.io/cooltool-1009/pipeline_image:latest"; }
    public Object[] extraEnv() { return new Object[]{}; }

    public Object apiVersion() { return "v1"; }
    public Object kind() { return "ReplicationController"; }

    public class BaseTemplateSpec extends JsonnetObject {
        public Set<String> nonHiddenFields() {
            Set<String> r = super.nonHiddenFields();
            r.addAll(Arrays.asList("replicas", "spec"));
            return r;
        }

        public Object replicas() { return 1.0; }

        public class BaseTemplateSpecSpec extends JsonnetObject {
            public Set<String> nonHiddenFields() {
                Set<String> r = super.nonHiddenFields();
                r.addAll(Arrays.asList("containers"));
                return r;
            }

            public class Container0 extends JsonnetObject {
                public Set<String> nonHiddenFields() {
                    Set<String> r = super.nonHiddenFields();
                    r.addAll(Arrays.asList("env", "image", "name"));
                    return r;
                }

                class Env0 extends JsonnetObject {
                    public Set<String> nonHiddenFields() {
                        Set<String> r = super.nonHiddenFields();
                        r.addAll(Arrays.asList("name", "value"));
                        return r;
                    }
                    public Object name() { return "ACCESSTOKEN"; }
                    public Object value() { return BaseTemplate.this.accessToken(); }
                }

                public Object[] env() {
                    // Concatenating arrays (first + second) is hard in Java.
                    Object[] first = new Object[]{ new Env0() };
                    Object[] second = BaseTemplate.this.extraEnv();
                    Object[] result = Arrays.copyOf(first, first.length + second.length);
                    System.arraycopy(second, 0, result, first.length, second.length);
                    return result;
                }
                public Object image() { return BaseTemplate.this.image(); }
                public Object name() { return "twitter-to-redis"; }
            }

            public Object containers() { return new Object[] { new Container0() }; }
        }
        public Object spec() { return new BaseTemplateSpecSpec(); }

    }
    public Object spec() { return new BaseTemplateSpec(); }
}

