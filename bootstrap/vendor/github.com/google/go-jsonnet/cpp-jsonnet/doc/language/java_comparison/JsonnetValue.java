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

import java.lang.reflect.Method;
import java.lang.reflect.InvocationTargetException;
import java.util.HashSet;
import java.util.Set;

public class JsonnetValue {
    public static String manifest(Object value) {
        StringBuffer buf = new StringBuffer();
        if (value == null) {
            buf.append("null");

        } else if (value instanceof String) {
            // FIXME: does not escape the string
            buf.append("\"" + value + "\"");

        } else if (value instanceof Double) {
            buf.append(value.toString());

        } else if (value instanceof Boolean) {
            buf.append(value.toString());

        } else if (value instanceof Object[]) {
            Object[] arr = (Object[]) value;
            buf.append("[");
            String prefix = " ";
            for (Object element : arr) {
                buf.append(prefix);
                prefix = ", ";
                buf.append(manifest(element));
            }
            buf.append(" ]");

        } else if (value instanceof JsonnetObject) {
            JsonnetObject obj = (JsonnetObject) value;
            buf.append("{");
            String prefix = " ";
            for (String field : obj.nonHiddenFields()) {
                buf.append(prefix);
                prefix = ", ";
                buf.append("\"" + field + "\": ");
                try {
                    Method method = obj.getClass().getMethod(field);
                    Object fieldValue = method.invoke(obj);
                    buf.append(manifest(fieldValue));
                } catch (IllegalArgumentException e) {
                    System.out.println(e);
                } catch (IllegalAccessException e) {
                    System.out.println(e);
                } catch (InvocationTargetException e) {
                    System.out.println(e);
                } catch (SecurityException e) {
                    System.out.println(e);
                } catch (NoSuchMethodException e) {
                    System.out.println(e);
                }
            }
            buf.append(" }");
        } else {
            throw new RuntimeException("Got weird type: " + value.getClass());
        }
        return buf.toString();
    }
}

