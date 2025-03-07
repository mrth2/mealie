<template>
  <v-navigation-drawer v-model="showDrawer" class="d-flex flex-column d-print-none" clipped app :expand-on-hover="false" width="240px">
    <!-- User Profile -->
    <template v-if="loggedIn">
      <v-list-item two-line :to="userProfileLink" exact>
        <UserAvatar list :user-id="sessionUser.id" :tooltip="false" />

        <v-list-item-title class="pr-2"> {{ sessionUser.fullName }}</v-list-item-title>
        <v-list-item-subtitle>
          <v-btn v-if="isOwnGroup" class="px-2 pa-0" variant="text" :to="userFavoritesLink" size="small">
            <v-icon start size="small">
              {{ $globals.icons.heart }}
            </v-icon>
            {{ $t("user.favorite-recipes") }}
          </v-btn>
        </v-list-item-subtitle>
      </v-list-item>
      <v-divider></v-divider>
    </template>

    <slot></slot>

    <!-- Primary Links -->
    <template v-if="topLink">
      <v-list nav density="comfortable" v-model:selected="secondarySelected">
        <template v-for="nav in topLink">
          <div v-if="!nav.restricted || isOwnGroup" :key="nav.key || nav.title">
            <!-- Multi Items -->
            <v-list-group v-if="nav.children" :key="(nav.key || nav.title) + 'multi-item'"
              v-model="dropDowns[nav.title]" color="primary" :prepend-icon="nav.icon">
              <template #activator>
                <v-list-item-title>{{ nav.title }}</v-list-item-title>
              </template>

              <v-list-item v-for="child in nav.children" :key="child.key || child.title" exact :to="child.to"
                class="ml-2">
                <template #prepend>
                  <v-icon>{{ child.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ child.title }}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <!-- Single Item -->
            <template v-else :key="(nav.key || nav.title) + 'single-item'">
              <v-list-item exact link :to="nav.to">
                <template #prepend>
                  <v-icon>{{ nav.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ nav.title }}</v-list-item-title>
              </v-list-item>
            </template>
          </div>
        </template>
      </v-list>
    </template>

    <!-- Secondary Links -->
    <template v-if="secondaryLinks.length > 0">
      <v-divider class="mt-2"></v-divider>
      <v-list nav density="compact" exact v-model:selected="secondarySelected">
        <template v-for="nav in secondaryLinks">
          <div v-if="!nav.restricted || isOwnGroup" :key="nav.key || nav.title">
            <!-- Multi Items -->
            <v-list-group v-if="nav.children" :key="(nav.key || nav.title) + 'multi-item'"
              v-model="dropDowns[nav.title]" color="primary" :prepend-icon="nav.icon">
              <template #activator>
                <v-list-item-title>{{ nav.title }}</v-list-item-title>
              </template>

              <v-list-item v-for="child in nav.children" :key="child.key || child.title" exact :to="child.to"
                class="ml-2">
                <template #prepend>
                  <v-icon>{{ child.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ child.title }}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <!-- Single Item -->
            <template v-else :key="(nav.key || nav.title) + 'single-item'">
              <v-list-item exact link :to="nav.to">
                <template #prepend>
                  <v-icon>{{ nav.icon }}</v-icon>
                </template>
                <v-list-item-title>{{ nav.title }}</v-list-item-title>
              </v-list-item>
            </template>
          </div>
        </template>
      </v-list>
    </template>

    <!-- Bottom Navigation Links -->
    <template v-if="bottomLinks" #append>
      <v-list nav density="compact" v-model:selected="bottomSelected">
        <template v-for="nav in bottomLinks">
          <div v-if="!nav.restricted || isOwnGroup" :key="nav.key || nav.title">
            <v-list-item :key="nav.key || nav.title" exact link :to="nav.to" :href="nav.href"
              :target="nav.href ? '_blank' : null">
              <template #prepend>
                <v-icon>{{ nav.icon }}</v-icon>
              </template>
              <v-list-item-title>{{ nav.title }}</v-list-item-title>
            </v-list-item>
          </div>
        </template>
        <slot name="bottom"></slot>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { defineModel } from "vue";
import { useLoggedInState } from "~/composables/use-logged-in-state";
import type { SidebarLinks } from "~/types/application-types";
import UserAvatar from "~/components/Domain/User/UserAvatar.vue";
import { useWindowSize } from "@vueuse/core";

export default defineNuxtComponent({
  components: {
    UserAvatar,
  },
  props: {
    user: {
      type: Object,
      default: null,
    },
    topLink: {
      type: Array as () => SidebarLinks,
      required: true,
    },
    secondaryLinks: {
      type: Array as () => SidebarLinks,
      required: false,
      default: null,
    },
    bottomLinks: {
      type: Array as () => SidebarLinks,
      required: false,
      default: [],
    },
  },
  setup(props, context) {
    const $auth = useMealieAuth();
    const { loggedIn, isOwnGroup } = useLoggedInState();

    const userFavoritesLink = computed(() => $auth.user.value ? `/user/${$auth.user.value.id}/favorites` : undefined);
    const userProfileLink = computed(() => $auth.user.value ? "/user/profile" : undefined);

    const state = reactive({
      dropDowns: {} as Record<string, boolean>,
      topSelected: null as string[] | null,
      secondarySelected: null as string[] | null,
      bottomSelected: null as string[] | null,
      hasOpenedBefore: false as boolean,
    });
    // model to control the drawer
    const showDrawer = defineModel<boolean>('drawer', {
      required: false,
      default: false,
    });
    watch(showDrawer, () => {
      if (window.innerWidth < 760 && state.hasOpenedBefore === false) {
        state.hasOpenedBefore = true;
      }
    })
    const { width: wWidth } = useWindowSize();
    watch(wWidth, (w) => {
      if (w > 760) {
        showDrawer.value = true;
      }
      else {
        showDrawer.value = false;
      }
    });


    const allLinks = computed(() => [...props.topLink, ...(props.secondaryLinks || []), ...(props.bottomLinks || [])]);
    function initDropdowns() {
      allLinks.value.forEach((link) => {
        state.dropDowns[link.title] = link.childrenStartExpanded || false;
      })
    }
    watch(
      () => allLinks,
      () => {
        initDropdowns();
      },
      {
        deep: true,
      }
    );

    return {
      ...toRefs(state),
      userFavoritesLink,
      userProfileLink,
      showDrawer,
      loggedIn,
      isOwnGroup,
      sessionUser: $auth.user,
    };
  },
});
</script>

<style scoped>
@media print {
  .no-print {
    display: none;
  }
}

.favorites-link {
  text-decoration: none;
}

.favorites-link:hover {
  text-decoration: underline;
}
</style>
