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
            {{ t('example.edit') }}
          </ElButton>
          <ElButton type="success" @click="action(row, 'detail')">
            {{ t('example.detail') }}
          </ElButton>
          <ElButton type="danger" @click="delData(row, false)">
            {{ t('example.del') }}
          </ElButton>
        </template>
      </Table>
    </Contentwrap>
  </div>
</template>
<script setup>
import { getBlogListApi, delBlogApi } from '@/api/blog'
import { Table } from '@/components/Table'
import { useTable } from '@/hooks/web/useTable'
import { useRouter } from 'vue-router'

const { push } = useRouter()

defineOptions({
  name: 'Blogs'
})

const { register, tableObject, methods } = useTable({
  getListApi: getBlogListApi,
  delListApi: delBlogApi,
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
    field: 'article_id',
    label: 'ID',
    type: 'index'
  },
  {
    field: 'article_title',
    label: t('article.title'),
    search: {
      show: true
    }
  },
  {
    field: 'user_id',
    label: t('article.author'),
    formatter: (row, column, cellValue) => {
      return '张三'
    }
  },
  {
    field: 'article_type',
    label: t('article.type')
  },
  {
    field: 'update_time',
    label: t('article.updateTime')
  },
  {
    field: 'create_time',
    label: t('article.createTime')
  },
  {
    field: 'article_views',
    label: t('article.views')
  },
  {
    field: 'article_likes',
    label: t('article.likes')
  },
  {
    field: 'action',
    width: '260px',
    label: t('table.action')
  }
])


</script>
