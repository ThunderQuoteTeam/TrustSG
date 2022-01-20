<template>
    <q-input :filled="isFilledStyle" v-model="dateString" :label="label">
        <template v-slot:append>
            <q-icon name="event" class="cursor-pointer q-mr-sm">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date v-model="dateString" mask="YYYY-MM-DD HH:mm">
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" :color="color" flat />
                    </div>
                    </q-date>
                </q-popup-proxy>
            </q-icon>
            <q-icon name="access_time" class="cursor-pointer">
                <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-time v-model="dateString" mask="YYYY-MM-DD HH:mm" format24h>
                    <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" :color="color" flat />
                    </div>
                    </q-time>
                </q-popup-proxy>
            </q-icon>
        </template>
    </q-input>
</template>

<script>
    import { defineComponent, watch, ref } from 'vue';

    export default defineComponent({
        props: {
            isFilledStyle: {
                type: Boolean,
                default: true,
            },
            label: String,
            color: {
                type: String,
                default: 'primary'
            },
            parentDateString: String
        },
        emits: ['update:parentDateString'],
        setup(props, {emit}) {
            const dateString = ref(null);

            watch(() => props.parentDateString, (newVal) => {
                console.log('parent date string changed', newVal);
                // change detected in parentDateString, sync changes to local dateString
                dateString.value = newVal;
            });
            watch(dateString, ()=> {
                emit('update:parentDateString', dateString.value);
            });

            return {
                dateString
            }
        }
    });
</script>