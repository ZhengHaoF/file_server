import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export function useFilePath() {
  const router = useRouter();
  const route = useRoute();

  const currentPath = ref('');

  const initializePath = () => {
    if (route.params.path && route.params.path.length > 0) {
      const pathArray = Array.isArray(route.params.path) 
        ? route.params.path 
        : [route.params.path];
      currentPath.value = pathArray.join('/');
    } else {
      currentPath.value = '';
    }
  };

  const isRoot = computed(() => {
    return currentPath.value === '' || currentPath.value === '$';
  });

  const pathSegments = computed(() => {
    const path = currentPath.value.replace(/^\$/, '');
    if (!path) return [];
    return path.split('/').filter(Boolean);
  });

  const breadcrumbs = computed(() => {
    const crumbs = [{ name: '根目录', path: '' }];
    let accumulatedPath = '';
    
    pathSegments.value.forEach((segment) => {
      accumulatedPath = accumulatedPath ? `${accumulatedPath}/${segment}` : segment;
      crumbs.push({
        name: decodeURIComponent(segment),
        path: accumulatedPath
      });
    });
    
    return crumbs;
  });

  const sanitizePath = (path) => {
    if (!path) return '';
    return path.replace(/\.\./g, '').replace(/[<>:"|?*]/g, '').replace(/^\/+|\/+$/g, '');
  };

  const encodePathSegment = (segment) => {
    return encodeURIComponent(segment);
  };

  const decodePathSegment = (segment) => {
    try {
      return decodeURIComponent(segment);
    } catch {
      return segment;
    }
  };

  const navigateTo = (newPath) => {
    const cleanPath = sanitizePath(newPath);
    currentPath.value = cleanPath;
    
    if (cleanPath) {
      router.push(`/${cleanPath}`);
    } else {
      router.push('/');
    }
  };

  const enterDirectory = (dirName) => {
    const encodedName = encodePathSegment(dirName);
    const newPath = currentPath.value 
      ? `${currentPath.value}/${encodedName}`
      : encodedName;
    navigateTo(newPath);
  };

  const goBack = () => {
    const segments = currentPath.value.split('/').filter(Boolean);
    if (segments.length > 0) {
      segments.pop();
      navigateTo(segments.join('/'));
    } else {
      router.back();
    }
  };

  const goToRoot = () => {
    navigateTo('');
  };

  const goToBreadcrumb = (path) => {
    navigateTo(path);
  };

  return {
    currentPath,
    isRoot,
    pathSegments,
    breadcrumbs,
    initializePath,
    navigateTo,
    enterDirectory,
    goBack,
    goToRoot,
    goToBreadcrumb,
    sanitizePath,
    encodePathSegment,
    decodePathSegment
  };
}
