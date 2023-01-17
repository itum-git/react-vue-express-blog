<template>
  <div>
    <Contentwrap>
      <Table
        v-model:pageSize="tableObject.pageSize"
        v-model:currentPage="tableObject.currentPage"
        :columns="tableSchemas.tableColumns"
        :data="tableObject.tableList"
        :loading="tableObject.loading"
        :pagination="{
          total: tableObject.total
        }"
        @register="register"
      >
        <template #action="{ row }">
          <ElButton type="primary" @click="action(row, 'edit')">
            {{ t('article.edit') }}
          </ElButton>
          <ElButton type="success" @click="action(row, 'detail')">
            {{ t('article.detail') }}
          </ElButton>
          <ElButton type="danger" @click="delData(row, false)">
            {{ t('article.del') }}
          </ElButton>
        </template>
      </Table>
    </Contentwrap>
  </div>
</template>
<script setup>
import { getBlogTypeApi, delBlogTypeApi } from '@/api/blog'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { useRouter } from 'vue-router'

const { push } = useRouter()

defineOptions({
  name: 'Blogs'
})

const { register, tableObject, methods } = useTable({
  getListApi: getBlogTypeApi,
  delListApi: delBlogTypeApi,
  response: {
    list: 'list',
    total: 'total'
  }
})

const { getList, setSearchParams } = methods

getList()

const { t } = useI18n()

const tableSchemas = reactive([
  {
    field: 'type_id',
    label: 'ID',
    type: 'index'
  },
  {
    field: 'type_name',
    label: t('articleType.name'),
    search: {
      show: true
    }
  },
  {
    field: 'type_type',
    label: t('type.type')
  },
  {
    field: 'update_time',
    label: t('table.updateTime')
  },
  {
    field: 'create_time',
    label: t('table.createTime')
  },
  {
    field: 'action',
    width: '260px',
    label: t('table.action')
  }
])


</script>
